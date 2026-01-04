export interface ParsedTransaction {
  date: Date;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  document?: string;
  rawData?: any;
}

export interface BankParser {
  name: string;
  detectFormat(data: any[][]): boolean;
  parse(data: any[][]): ParsedTransaction[];
}

export enum ImportType {
  CONTA_CORRENTE = "CONTA_CORRENTE",
  CARTAO_CREDITO = "CARTAO_CREDITO",
}
