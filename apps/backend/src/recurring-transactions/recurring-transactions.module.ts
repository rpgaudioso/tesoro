import { Module } from "@nestjs/common";
import { NotificationsModule } from "../notifications/notifications.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RecurringTransactionsController } from "./recurring-transactions.controller";
import { RecurringTransactionsService } from "./recurring-transactions.service";

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService],
  exports: [RecurringTransactionsService],
})
export class RecurringTransactionsModule {}
