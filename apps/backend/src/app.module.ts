import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AccountsModule } from "./accounts/accounts.module";
import { AuthModule } from "./auth/auth.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { CategoriesModule } from "./categories/categories.module";
import { CreditCardsModule } from "./credit-cards/credit-cards.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ImportsModule } from "./imports/imports.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { PeopleModule } from "./people/people.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RecurringTransactionsModule } from "./recurring-transactions/recurring-transactions.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { WorkspacesModule } from "./workspaces/workspaces.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    WorkspacesModule,
    PeopleModule,
    CategoriesModule,
    AccountsModule,
    BudgetsModule,
    TransactionsModule,
    CreditCardsModule,
    DashboardModule,
    ImportsModule,
    RecurringTransactionsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
