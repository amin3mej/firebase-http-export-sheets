import {google} from "googleapis";
import {intToExcelCol} from "excel-column-name";
import {extensionParameters} from "./parameters";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
function getAuthorization() {
  return new google.auth.GoogleAuth({
    scopes: SCOPES,
    credentials: {
      client_email: extensionParameters.GOOGLE_API_CREDENTIALS_CLIENT_EMAIL,
      private_key: extensionParameters.GOOGLE_API_CREDENTIALS_PRIVATE_KEY,
    },
  });
}

function getSheet() {
  return google.sheets({version: "v4", auth: getAuthorization()});
}

export async function getHeaderColumns() {
  const result = await getSheet().spreadsheets.values.get({
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
  const sheet = getSheet();
  await sheet.spreadsheets.values.append({
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

  const sheet = getSheet();
  const range = extensionParameters.GOOGLE_SPREADSHEET_SHEET_ID +
    "!" + (intToExcelCol(currentColumns.length)) + "1:" +
     intToExcelCol(currentColumns.length + newColumns.length) + "1";
  await sheet.spreadsheets.values.update({
    spreadsheetId: extensionParameters.GOOGLE_SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values: [newColumns],
    },
  });
}
