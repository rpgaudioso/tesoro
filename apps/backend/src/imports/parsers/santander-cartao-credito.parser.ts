import { BankParser, ParsedTransaction } from "./types";

export class SantanderCartaoCreditoParser implements BankParser {
  name = "Santander Cartão de Crédito";

  detectFormat(data: any[][]): boolean {
    // Verifica se tem "Lançamentos" na primeira linha
    if (!data || data.length < 4) return false;
    const firstRow = data[0];
    return firstRow && firstRow[0]?.toString().includes("Lançamentos");
  }

  parse(data: any[][]): ParsedTransaction[] {
    const transactions: ParsedTransaction[] = [];
    let currentCard: string | null = null;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      // Detectar informação do cartão
      if (
        row[0]?.toString() === "Cartão" ||
        row[0]?.toString() === "Cartão on-line"
      ) {
        currentCard = row[1]?.toString() || "Desconhecido";
        continue;
      }

      // Pular linha de titular
      if (row[0]?.toString() === "Titular") {
        continue;
      }

      // Pular cabeçalhos de tabela
      if (row[0]?.toString() === "Data" && row[1]?.toString() === "Descrição") {
        continue;
      }

      // Pular linhas de subtotal
      if (row[1]?.toString().includes("Subtotal")) {
        continue;
      }

      // Pular débito automático de fatura (já é apenas o pagamento)
      if (
        row[1]?.toString().includes("Deb Autom De Fatura") ||
        row[1]?.toString().includes("Anuidade")
      ) {
        continue;
      }

      // Processar transação
      const dateValue = row[0];
      const description = row[1]?.toString().trim();
      const valueUSD = row[2];
      const valueBRL = row[3];

      // Validar se é uma linha de transação válida
      if (!dateValue || !description || typeof dateValue !== "number") {
        continue;
      }

      // Converter data Excel (serial number) para Date
      const date = this.excelDateToJSDate(dateValue);

      // Pegar valor em BRL (ou USD se BRL não estiver disponível)
      let amount = 0;
      if (valueBRL && valueBRL !== 0) {
        amount = Math.abs(parseFloat(valueBRL.toString()));
      } else if (valueUSD && valueUSD !== 0) {
        amount = Math.abs(parseFloat(valueUSD.toString()));
      }

      if (amount === 0 || isNaN(amount)) continue;

      // Cartão de crédito sempre são despesas (gastos)
      transactions.push({
        date,
        description: description || "Sem descrição",
        amount,
        type: "EXPENSE",
        document: undefined, // Cartão de crédito geralmente não tem documento
        rawData: {
          card: currentCard,
          valueUSD: valueUSD || 0,
          valueBRL: valueBRL || 0,
        },
      });
    }

    return transactions;
  }

  /**
   * Converte serial number do Excel para JavaScript Date
   * Excel armazena datas como número de dias desde 01/01/1900
   */
  private excelDateToJSDate(serial: number): Date {
    // Excel date serial number
    // Subtrair 25569 para ajustar para Unix epoch (01/01/1970)
    // Multiplicar por 86400 para converter dias em segundos
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate()
    );
  }
}
