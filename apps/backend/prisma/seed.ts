import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@tesoro.com" },
    update: {},
    create: {
      email: "demo@tesoro.com",
      passwordHash,
    },
  });

  console.log("✅ User created:", user.email);

  // Create workspace
  const workspace = await prisma.workspace.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Família Demo",
    },
  });

  console.log("✅ Workspace created:", workspace.name);

  // Create member
  await prisma.member.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: "OWNER",
    },
  });

  console.log("✅ Member created");

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

  for (const cat of categories) {
    await prisma.category.upsert({
      where: {
        id: `cat-${cat.name.toLowerCase().replace(/\s/g, "-")}`,
      },
      update: {},
      create: {
        id: `cat-${cat.name.toLowerCase().replace(/\s/g, "-")}`,
        workspaceId: workspace.id,
        ...cat,
      },
    });
  }

  console.log(`✅ ${categories.length} categories created`);

  // Create default person
  const person = await prisma.person.upsert({
    where: { id: "person-casa" },
    update: {},
    create: {
      id: "person-casa",
      workspaceId: workspace.id,
      name: "Casa",
      color: "#3498db",
    },
  });

  console.log("✅ Person created:", person.name);

  // Create default account
  const account = await prisma.account.upsert({
    where: { id: "account-main" },
    update: {},
    create: {
      id: "account-main",
      workspaceId: workspace.id,
      name: "Conta Corrente",
      type: "CHECKING",
      initialBalance: 5000,
    },
  });

  console.log("✅ Account created:", account.name);

  // Create default card
  const card = await prisma.card.upsert({
    where: { id: "card-main" },
    update: {},
    create: {
      id: "card-main",
      workspaceId: workspace.id,
      name: "Cartão Principal",
      closingDay: 10,
      dueDay: 17,
      limit: 3000,
    },
  });

  console.log("✅ Card created:", card.name);

  console.log("🎉 Seed completed!");
  console.log("\n📝 Login credentials:");
  console.log("   Email: demo@tesoro.com");
  console.log("   Password: password123");
  console.log(`   Workspace ID: ${workspace.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
