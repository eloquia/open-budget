import xlsx from "node-xlsx";
import { Config, Expenditure } from "../models";
import { ConfigNotFoundError } from "../errors/config-not-found-error";

const SPREADSHEET_LOCATION = "/Users/dalec/Downloads/2023 Wealth Planner.xlsx";
const OPEN_BUDGET_CONFIG_SHEET_NAME = "Open Budget Configuration";

export const readConfig = (): Config => {
  const workSheetsFromFile = xlsx.parse(SPREADSHEET_LOCATION);
  workSheetsFromFile.forEach((sheet) => {
    console.log(sheet.name);
  });

  return {
    general: {
      sheetFullPath: SPREADSHEET_LOCATION,
      confgSheetName: OPEN_BUDGET_CONFIG_SHEET_NAME,
    },
    expenditures: {
      expenditureSheetName: "Expenditures",
      dateColumnName: "Date",
      companyNameColumnName: "Company Name",
      amountColumnName: "Amount",
      accountColumnName: "Account",
      categoryColumnName: "Category",
    },
  };
};

export const updateConfig = (config: Config): Config => {
  return config;
};

export const createSpreadsheetExpenditure = (
  expenditure: Expenditure,
): Expenditure => {
  const config = readConfig();
  if (!config) {
    throw new ConfigNotFoundError();
  }
  return {};
};
