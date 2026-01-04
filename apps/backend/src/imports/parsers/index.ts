import { SantanderCartaoCreditoParser } from "./santander-cartao-credito.parser";
import { SantanderContaCorrenteParser } from "./santander-conta-corrente.parser";
import { BankParser, ParsedTransaction } from "./types";

export class ParserFactory {
  private static parsers: BankParser[] = [
    new SantanderContaCorrenteParser(),
    new SantanderCartaoCreditoParser(),
  ];

  /**
   * Detecta automaticamente o parser adequado baseado nos dados
   */
  static detectParser(data: any[][]): BankParser | null {
    for (const parser of this.parsers) {
      if (parser.detectFormat(data)) {
        return parser;
      }
    }
    return null;
  }

  /**
   * Processa arquivo e retorna transações parseadas
   */
  static parseData(data: any[][]): {
    parser: BankParser;
    transactions: ParsedTransaction[];
  } {
    const parser = this.detectParser(data);

    if (!parser) {
      throw new Error(
        "Formato de arquivo não reconhecido. Verifique se é um extrato válido do Santander."
      );
    }

    const transactions = parser.parse(data);

    if (transactions.length === 0) {
      throw new Error("Nenhuma transação encontrada no arquivo.");
    }

    return {
      parser,
      transactions,
    };
  }

  /**
   * Retorna lista de parsers disponíveis
   */
  static getAvailableParsers(): Array<{ name: string; description: string }> {
    return [
      {
        name: "Santander Conta Corrente",
        description: "Extrato de conta corrente do Santander (formato .xls)",
      },
      {
        name: "Santander Cartão de Crédito",
        description:
          "Extrato de cartão de crédito do Santander (formato .xlsx)",
      },
    ];
  }
}

export * from "./santander-cartao-credito.parser";
export * from "./santander-conta-corrente.parser";
export * from "./types";
