import xlsx from 'node-xlsx';

const SPREADSHEET_LOCATION = "/Users/dalec/Downloads/2023 Wealth Planner.xlsx";
const OPEN_BUDGET_CONFIG_SHEET_NAME = "Open Budget Configuration";

export const readConfig = () => {
  const workSheetsFromFile = xlsx.parse(SPREADSHEET_LOCATION);
  workSheetsFromFile.forEach((sheet) => {
    console.log(sheet.name);
  })
}
