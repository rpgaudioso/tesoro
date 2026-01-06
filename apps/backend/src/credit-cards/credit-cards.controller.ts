import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard } from "../auth/guards/workspace.guard";
import { CreditCardsService } from "./credit-cards.service";

@Controller("workspaces/:workspaceId/credit-cards")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  // ==================== CREDIT CARDS ====================

  @Post()
  createCard(@Param("workspaceId") workspaceId: string, @Body() data: any) {
    return this.creditCardsService.createCard(workspaceId, data);
  }

  @Get()
  findAllCards(@Param("workspaceId") workspaceId: string) {
    return this.creditCardsService.findAllCards(workspaceId);
  }

  @Get(":cardId")
  findCardById(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string
  ) {
    return this.creditCardsService.findCardById(workspaceId, cardId);
  }

  @Patch(":cardId")
  updateCard(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string,
    @Body() data: any
  ) {
    return this.creditCardsService.updateCard(workspaceId, cardId, data);
  }

  @Delete(":cardId")
  deleteCard(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string
  ) {
    return this.creditCardsService.deleteCard(workspaceId, cardId);
  }

  // ==================== INVOICES ====================

  @Post(":cardId/invoices/ensure")
  ensureInvoice(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string,
    @Body() data: { month: string }
  ) {
    return this.creditCardsService.ensureInvoice(
      workspaceId,
      cardId,
      data.month
    );
  }

  @Post(":cardId/invoices/upload")
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads/invoices',
    })
  )
  async uploadInvoice(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string,
    @Body('month') month: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.creditCardsService.uploadInvoice(
      workspaceId,
      cardId,
      month,
      file
    );
  }

  @Get(":cardId/invoices")
  findInvoices(
    @Param("workspaceId") workspaceId: string,
    @Param("cardId") cardId: string,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.creditCardsService.findInvoices(workspaceId, cardId, from, to);
  }
}

@Controller("workspaces/:workspaceId/invoices")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class InvoicesController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Get(":invoiceId")
  findInvoiceById(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string
  ) {
    return this.creditCardsService.findInvoiceById(workspaceId, invoiceId);
  }

  @Post(":invoiceId/close")
  closeInvoice(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string
  ) {
    return this.creditCardsService.closeInvoice(workspaceId, invoiceId);
  }

  @Post(":invoiceId/pay")
  payInvoice(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string,
    @Body() data: any
  ) {
    return this.creditCardsService.payInvoice(workspaceId, invoiceId, data);
  }

  @Get(":invoiceId/payment")
  findPayment(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string
  ) {
    return this.creditCardsService.findPayment(workspaceId, invoiceId);
  }

  // ==================== CHARGES ====================

  @Post(":invoiceId/charges")
  createCharge(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string,
    @Body() data: any
  ) {
    return this.creditCardsService.createCharge(workspaceId, invoiceId, data);
  }

  @Get(":invoiceId/charges")
  findCharges(
    @Param("workspaceId") workspaceId: string,
    @Param("invoiceId") invoiceId: string,
    @Query("categoryId") categoryId?: string,
    @Query("q") q?: string
  ) {
    return this.creditCardsService.findCharges(
      workspaceId,
      invoiceId,
      categoryId,
      q
    );
  }
}

@Controller("workspaces/:workspaceId/charges")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class ChargesController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Patch(":chargeId")
  updateCharge(
    @Param("workspaceId") workspaceId: string,
    @Param("chargeId") chargeId: string,
    @Body() data: any
  ) {
    return this.creditCardsService.updateCharge(workspaceId, chargeId, data);
  }

  @Delete(":chargeId")
  deleteCharge(
    @Param("workspaceId") workspaceId: string,
    @Param("chargeId") chargeId: string
  ) {
    return this.creditCardsService.deleteCharge(workspaceId, chargeId);
  }
}
