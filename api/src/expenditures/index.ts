import { HTTPException } from 'hono/http-exception';

import { ConfigNotFoundError } from "../errors/config-not-found-error";
import { Expenditure } from "../models";
import { createSpreadsheetExpenditure } from "../spreadsheet";

export const createExpenditure = (expenditure: Expenditure): Expenditure | undefined => {
  try {
    return createSpreadsheetExpenditure(expenditure);
  } catch (error) {
    if (error instanceof ConfigNotFoundError) {
      throw new HTTPException(500, { message: "Config not found" });
    }
  }
}
