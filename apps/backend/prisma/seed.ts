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

  // Create default credit card
  const creditCard = await prisma.creditCard.upsert({
    where: { id: "card-main" },
    update: {},
    create: {
      id: "card-main",
      workspaceId: workspace.id,
      name: "Cartão Visa",
      brand: "Visa",
      last4: "1234",
      creditLimit: 10000,
      closingDay: 10,
      dueDay: 20,
      paymentAccountId: account.id,
      status: "ACTIVE",
    },
  });

  console.log("✅ Credit card created:", creditCard.name);

  // Create a sample invoice
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const invoice = await prisma.creditCardInvoice.upsert({
    where: {
      workspaceId_creditCardId_month: {
        workspaceId: workspace.id,
        creditCardId: creditCard.id,
        month: currentMonth,
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      creditCardId: creditCard.id,
      month: currentMonth,
      status: "OPEN",
      dueDate: new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        creditCard.dueDay
      ),
      totalAmount: 0,
    },
  });

  console.log("✅ Invoice created for:", currentMonth);

  // Create sample charges
  const alimentacaoId = `cat-alimentação`;
  const transporteId = `cat-transporte`;

  const charges = [
    {
      description: "Supermercado",
      amount: 350.5,
      categoryId: alimentacaoId,
      purchaseDate: new Date(now.getFullYear(), now.getMonth(), 5),
    },
    {
      description: "Restaurante",
      amount: 125.0,
      categoryId: alimentacaoId,
      purchaseDate: new Date(now.getFullYear(), now.getMonth(), 8),
    },
    {
      description: "Posto de Gasolina",
      amount: 280.0,
      categoryId: transporteId,
      purchaseDate: new Date(now.getFullYear(), now.getMonth(), 12),
    },
  ];

  let totalCharges = 0;
  for (const charge of charges) {
    await prisma.creditCardCharge.create({
      data: {
        workspaceId: workspace.id,
        creditCardId: creditCard.id,
        invoiceId: invoice.id,
        type: "PURCHASE",
        ...charge,
      },
    });
    totalCharges += charge.amount;
  }

  // Update invoice total
  await prisma.creditCardInvoice.update({
    where: { id: invoice.id },
    data: { totalAmount: totalCharges },
  });

  console.log(
    `✅ ${charges.length} charges created, total: R$ ${totalCharges.toFixed(2)}`
  );

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
