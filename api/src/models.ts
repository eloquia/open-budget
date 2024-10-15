export interface Config {
  general: {
    sheetFullPath: string
    confgSheetName: string
  },
  expenditures: {
    expenditureSheetName: string
    dateColumnName: string
    companyNameColumnName: string
    amountColumnName: string
    accountColumnName: string
    categoryColumnName: string
  }
}

export interface Account {
  id: string
  name: string
  balance: number
  accountType: string
}

export interface Expenditure {
  id: string
  date: string
  companyName: string
  amount: number
  account?: string
  category?: string
}
