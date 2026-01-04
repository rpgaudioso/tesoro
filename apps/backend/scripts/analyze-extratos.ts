import * as path from "path";
import * as XLSX from "xlsx";

const EXTRATOS_PATH = path.join(__dirname, "../../../extratos/santander");

// Analisar conta corrente
console.log("=== CONTA CORRENTE SANTANDER ===\n");
const ccPath = path.join(EXTRATOS_PATH, "conta-corrente/planilhaExtrato.xls");
const ccWorkbook = XLSX.readFile(ccPath);
const ccSheetName = ccWorkbook.SheetNames[0];
const ccSheet = ccWorkbook.Sheets[ccSheetName];
const ccData = XLSX.utils.sheet_to_json(ccSheet, { header: 1 });

console.log("Primeiras 15 linhas:");
ccData.slice(0, 15).forEach((row, idx) => {
  console.log(`Linha ${idx}:`, row);
});

console.log("\n\n=== CARTÃO DE CRÉDITO SANTANDER ===\n");
const cardPath = path.join(
  EXTRATOS_PATH,
  "cartao-de-credito/extrato-cartao.xlsx"
);
const cardWorkbook = XLSX.readFile(cardPath);
const cardSheetName = cardWorkbook.SheetNames[0];
const cardSheet = cardWorkbook.Sheets[cardSheetName];
const cardData = XLSX.utils.sheet_to_json(cardSheet, { header: 1 });

console.log("Primeiras 15 linhas:");
cardData.slice(0, 15).forEach((row, idx) => {
  console.log(`Linha ${idx}:`, row);
});
