import * as path from "path";
import * as XLSX from "xlsx";
import { ParserFactory } from "../src/imports/parsers";

const EXTRATOS_PATH = path.join(__dirname, "../../../extratos/santander");

async function testParsers() {
  console.log("🧪 TESTANDO PARSERS\n");

  // Teste conta corrente
  console.log("=== CONTA CORRENTE ===");
  const ccPath = path.join(EXTRATOS_PATH, "conta-corrente/planilhaExtrato.xls");
  const ccWorkbook = XLSX.readFile(ccPath);
  const ccSheetName = ccWorkbook.SheetNames[0];
  const ccSheet = ccWorkbook.Sheets[ccSheetName];
  const ccData = XLSX.utils.sheet_to_json(ccSheet, { header: 1 });

  try {
    const ccResult = ParserFactory.parseData(ccData as any[][]);
    console.log(`✅ Parser detectado: ${ccResult.parser.name}`);
    console.log(`✅ Transações parseadas: ${ccResult.transactions.length}`);
    console.log("\nPrimeiras 5 transações:");
    ccResult.transactions.slice(0, 5).forEach((t, idx) => {
      console.log(
        `${idx + 1}. ${t.date.toLocaleDateString("pt-BR")} - ${t.description}`
      );
      console.log(`   ${t.type}: R$ ${t.amount.toFixed(2)}`);
    });
  } catch (error) {
    console.error("❌ Erro:", error.message);
  }

  console.log("\n=== CARTÃO DE CRÉDITO ===");
  const cardPath = path.join(
    EXTRATOS_PATH,
    "cartao-de-credito/extrato-cartao.xlsx"
  );
  const cardWorkbook = XLSX.readFile(cardPath);
  const cardSheetName = cardWorkbook.SheetNames[0];
  const cardSheet = cardWorkbook.Sheets[cardSheetName];
  const cardData = XLSX.utils.sheet_to_json(cardSheet, { header: 1 });

  try {
    const cardResult = ParserFactory.parseData(cardData as any[][]);
    console.log(`✅ Parser detectado: ${cardResult.parser.name}`);
    console.log(`✅ Transações parseadas: ${cardResult.transactions.length}`);
    console.log("\nPrimeiras 5 transações:");
    cardResult.transactions.slice(0, 5).forEach((t, idx) => {
      console.log(
        `${idx + 1}. ${t.date.toLocaleDateString("pt-BR")} - ${t.description}`
      );
      console.log(`   ${t.type}: R$ ${t.amount.toFixed(2)}`);
    });
  } catch (error) {
    console.error("❌ Erro:", error.message);
  }
}

testParsers();
