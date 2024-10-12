export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Config {
  general: {
    sheetFullPath: string
    confgSheetName: string
  }

}

export interface Transaction {
  id: string
  date: string
  companyName: string
  amount: number
  account?: string
  category?: string
}