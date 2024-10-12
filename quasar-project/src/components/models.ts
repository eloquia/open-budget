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
