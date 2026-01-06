import { BadRequestException, Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";

export interface ParsedCharge {
  date: Date;
  description: string;
  amountUSD: number;
  amountBRL: number;
}

export interface ParsedInvoiceData {
  cardLast4: string;
  holderName: string;
  charges: ParsedCharge[];
  totalAmount: number;
}

@Injectable()
export class InvoiceParserService {
  /**
   * Parses an Excel invoice file and extracts charge data
   * Expected format:
   * - Row 1: "Lançamentos"
   * - Row 2: "Cartão" | "Final XXXX"
   * - Row 3: "Titular" | "Nome do titular"
   * - Row 4: "Data" | "Descrição" | "Valor (US$)" | "Valor (R$)"
   * - Row 5+: Transaction data
   */
  parseInvoiceFile(buffer: Buffer): ParsedInvoiceData {
    try {
      // Read the workbook from buffer
      const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON with header starting at row 1
      const data: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
        defval: null,
      });

      if (!data || data.length < 5) {
        throw new BadRequestException(
          "Arquivo de fatura inválido: formato não reconhecido"
        );
      }

      // Parse card info from row 2 (index 1)
      const cardRow = data[1];
      const cardInfo = this.extractCardLast4(cardRow);

      // Parse holder name from row 3 (index 2)
      const holderRow = data[2];
      const holderName = this.extractHolderName(holderRow);

      // Find where the actual charges start (after "Data" header)
      let chargesStartRow = -1;
      for (let i = 0; i < Math.min(data.length, 10); i++) {
        const row = data[i];
        if (row && row[0] === "Data" && row[1] === "Descrição") {
          chargesStartRow = i + 1;
          break;
        }
      }

      if (chargesStartRow === -1) {
        throw new BadRequestException(
          "Não foi possível encontrar o início dos lançamentos"
        );
      }

      // Parse charges until we hit "Subtotal" or another card section
      const charges: ParsedCharge[] = [];
      let totalAmount = 0;

      for (let i = chargesStartRow; i < data.length; i++) {
        const row = data[i];

        // Stop if we hit a subtotal or new section
        if (
          !row ||
          row.length === 0 ||
          row[0] === "Subtotal" ||
          row[0] === "Cartão" ||
          row[0] === "Cartão on-line" ||
          row[1] === "Subtotal"
        ) {
          break;
        }

        // Parse the charge row
        const charge = this.parseChargeRow(row);
        if (charge) {
          charges.push(charge);
          totalAmount += charge.amountBRL;
        }
      }

      if (charges.length === 0) {
        throw new BadRequestException("Nenhum lançamento encontrado na fatura");
      }

      return {
        cardLast4: cardInfo,
        holderName,
        charges,
        totalAmount,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Erro ao processar arquivo: ${error.message}`
      );
    }
  }

  private extractCardLast4(row: any[]): string {
    if (!row || row.length < 2) {
      throw new BadRequestException("Informações do cartão não encontradas");
    }

    const cardText = String(row[1] || "").trim();

    // Extract last 4 digits from formats like "Final 3415" or just "3415"
    const match = cardText.match(/(\d{4})/);
    if (!match) {
      throw new BadRequestException(
        "Número do cartão não encontrado no formato esperado"
      );
    }

    return match[1];
  }

  private extractHolderName(row: any[]): string {
    if (!row || row.length < 2) {
      throw new BadRequestException("Nome do titular não encontrado");
    }

    const name = String(row[1] || "").trim();
    if (!name || name.length === 0) {
      throw new BadRequestException("Nome do titular está vazio");
    }

    return name;
  }

  private parseChargeRow(row: any[]): ParsedCharge | null {
    // Expected format: [Date, Description, USD Amount, BRL Amount]
    if (!row || row.length < 4) {
      return null;
    }

    const dateValue = row[0];
    const description = String(row[1] || "").trim();
    const amountUSDValue = row[2];
    const amountBRLValue = row[3];

    // Skip rows without proper data
    if (!dateValue || !description || description.length === 0) {
      return null;
    }

    // Parse date
    let date: Date;
    if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      // Try to parse date string in DD/MM/YYYY format
      const dateStr = String(dateValue).trim();
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
      } else {
        // Try standard date parsing
        date = new Date(dateStr);
      }

      if (isNaN(date.getTime())) {
        console.warn(`Skipping row with invalid date: ${dateStr}`);
        return null;
      }
    }

    // Parse amounts
    const amountUSD = this.parseAmount(amountUSDValue);
    const amountBRL = this.parseAmount(amountBRLValue);

    if (amountBRL === 0) {
      return null; // Skip zero amount charges
    }

    return {
      date,
      description,
      amountUSD,
      amountBRL,
    };
  }

  private parseAmount(value: any): number {
    if (typeof value === "number") {
      return Math.abs(value);
    }

    if (typeof value === "string") {
      // Remove currency symbols, spaces, and convert comma to dot
      const cleaned = value.replace(/[R$\s]/g, "").replace(",", ".");

      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : Math.abs(parsed);
    }

    return 0;
  }
}
