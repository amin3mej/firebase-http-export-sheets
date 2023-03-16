import {intToExcelCol} from "excel-column-name";
import {google} from "googleapis";

import {extensionParameters} from "./parameters";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getSheet() {
  const auth = await google.auth.getClient({scopes: SCOPES});
  return google.sheets({version: "v4", auth: auth}).spreadsheets;
}

export async function getHeaderColumns() {
  const sheet = await getSheet();
  const result = await sheet.values.get({
    spreadsheetId: extensionParameters.GOOGLE_SPREADSHEET_ID,
    range: extensionParameters.GOOGLE_SPREADSHEET_SHEET_ID + "!1:1",
  });

  let columns: string[] = result.data.values?.[0] ?? [];
  if (columns.length === 1 && columns[0] === "") {
    columns = [];
  }

  return columns;
}

export async function appendRow(values: string[]) {
  const sheet = await getSheet();
  await sheet.values.append({
    spreadsheetId: extensionParameters.GOOGLE_SPREADSHEET_ID,
    range: extensionParameters.GOOGLE_SPREADSHEET_SHEET_ID,
    valueInputOption: "RAW",
    requestBody: {
      values: [values],
    },
  });
}

export async function setNewHeaderColumns(currentColumns: string[], newColumns: string[]) {
  if (newColumns.length === 0) {
    return;
  }

  const sheet = await getSheet();
  const range = extensionParameters.GOOGLE_SPREADSHEET_SHEET_ID +
    "!" + (intToExcelCol(currentColumns.length + 1)) + "1:" +
     intToExcelCol(currentColumns.length + newColumns.length) + "1";
  await sheet.values.update({
    spreadsheetId: extensionParameters.GOOGLE_SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values: [newColumns],
    },
  });
}
