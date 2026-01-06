import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import {
  ChargesController,
  CreditCardsController,
  InvoicesController,
} from "./credit-cards.controller";
import { CreditCardsService } from "./credit-cards.service";
import { InvoiceParserService } from "./invoice-parser.service";

@Module({
  imports: [PrismaModule],
  controllers: [CreditCardsController, InvoicesController, ChargesController],
  providers: [CreditCardsService, InvoiceParserService],
  exports: [CreditCardsService],
})
export class CreditCardsModule {}
