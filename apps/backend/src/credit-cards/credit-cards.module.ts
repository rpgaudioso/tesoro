import { Module } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import {
  CreditCardsController,
  InvoicesController,
  ChargesController,
} from './credit-cards.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CreditCardsController, InvoicesController, ChargesController],
  providers: [CreditCardsService],
  exports: [CreditCardsService],
})
export class CreditCardsModule {}
