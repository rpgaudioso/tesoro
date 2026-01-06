import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto } from "@tesoro/shared";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email já cadastrado");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create user only (workspace will be created in welcome tour)
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
      },
    });

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      workspaces: [],
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        members: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      workspaces: user.members.map((m) => ({
        id: m.workspace.id,
        name: m.workspace.name,
        role: m.role,
      })),
      token,
    };
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        members: {
          select: {
            workspaceId: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    return user;
  }

  async resetUserData(userId: string, autoSeed: boolean = false) {
    // Get all workspaces for this user
    const members = await this.prisma.member.findMany({
      where: { userId },
      include: { workspace: true },
    });

    const workspaceIds = members.map((m) => m.workspaceId);

    // Delete all data in transaction
    await this.prisma.$transaction(async (tx) => {
      // Delete in correct order to respect foreign keys
      for (const workspaceId of workspaceIds) {
        // Delete import batch rows first
        const batches = await tx.importBatch.findMany({
          where: { workspaceId },
          select: { id: true },
        });
        for (const batch of batches) {
          await tx.importedRow.deleteMany({
            where: { batchId: batch.id },
          });
        }

        // Delete import batches
        await tx.importBatch.deleteMany({
          where: { workspaceId },
        });

        // Delete transactions
        await tx.transaction.deleteMany({
          where: { workspaceId },
        });

        // Delete budgets
        await tx.budget.deleteMany({
          where: { workspaceId },
        });

        // Delete account-person relations
        const accounts = await tx.account.findMany({
          where: { workspaceId },
          select: { id: true },
        });
        for (const account of accounts) {
          await tx.accountPerson.deleteMany({
            where: { accountId: account.id },
          });
        }

        // Delete accounts
        await tx.account.deleteMany({
          where: { workspaceId },
        });

        // Delete people
        await tx.person.deleteMany({
          where: { workspaceId },
        });

        // Delete categories
        await tx.category.deleteMany({
          where: { workspaceId },
        });

        // Delete members
        await tx.member.deleteMany({
          where: { workspaceId },
        });

        // Delete workspace
        await tx.workspace.delete({
          where: { id: workspaceId },
        });
      }
    });

    // If autoSeed, create initial data
    if (autoSeed) {
      const result = await this.prisma.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
          data: { name: "Minha Workspace" },
        });

        await tx.member.create({
          data: {
            workspaceId: workspace.id,
            userId,
            role: "OWNER",
          },
        });

        // Create default categories
        const categories = [
          { name: "Alimentação", type: "EXPENSE", icon: "🍔", color: "#FF6B6B" },
          { name: "Transporte", type: "EXPENSE", icon: "🚗", color: "#4ECDC4" },
          { name: "Moradia", type: "EXPENSE", icon: "🏠", color: "#45B7D1" },
          { name: "Saúde", type: "EXPENSE", icon: "⚕️", color: "#96CEB4" },
          { name: "Educação", type: "EXPENSE", icon: "📚", color: "#FFEAA7" },
          { name: "Lazer", type: "EXPENSE", icon: "🎮", color: "#DFE6E9" },
          { name: "Vestuário", type: "EXPENSE", icon: "👕", color: "#A29BFE" },
          { name: "Salário", type: "INCOME", icon: "💰", color: "#00B894" },
          { name: "Investimentos", type: "INCOME", icon: "📈", color: "#6C5CE7" },
          { name: "Outros", type: "EXPENSE", icon: "📦", color: "#B2BEC3" },
        ];

        await tx.category.createMany({
          data: categories.map((cat) => ({
            workspaceId: workspace.id,
            name: cat.name,
            type: cat.type,
            icon: cat.icon,
            color: cat.color,
          })),
        });

        // Create default person
        await tx.person.create({
          data: {
            name: "Pessoal",
            color: "#3b82f6",
            workspaceId: workspace.id,
          },
        });

        // Create default account
        await tx.account.create({
          data: {
            name: "Conta Corrente",
            type: "CHECKING",
            workspaceId: workspace.id,
          },
        });

        return workspace;
      });

      return {
        message: "Dados resetados com sucesso",
        autoSeed: true,
        workspace: result,
      };
    }

    return {
      message: "Dados resetados com sucesso",
      autoSeed: false,
    };
  }
}
