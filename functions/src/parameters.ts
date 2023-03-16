export type ExtensionParameters = {
  GOOGLE_SPREADSHEET_ID: string;
  GOOGLE_SPREADSHEET_SHEET_ID: string;
  ALLOWED_FIELDS?: string;
  APP_CHECK: "yes" | "no";
  EMPTY_CELL: string;
};

const {
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_SPREADSHEET_SHEET_ID,
  ALLOWED_FIELDS,
  APP_CHECK,
  EMPTY_CELL = "",
} = process.env as ExtensionParameters;

export const extensionParameters: ExtensionParameters = {
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_SPREADSHEET_SHEET_ID,
  ALLOWED_FIELDS,
  APP_CHECK,
  EMPTY_CELL,
};
