import * as functions from "firebase-functions";

import {applyAppCheck} from "./appcheck";
import {extensionParameters} from "./parameters";
import {appendRow, getHeaderColumns, setNewHeaderColumns} from "./spreadsheet";
import {getAllowedFields, normalize} from "./utilities";

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled Rejection at Promise", p);
});

export function generateNewRow(headerColumns: string[], requestBody: Record<string, object>) {
  const allowedFields = getAllowedFields();

  const values = headerColumns.map(((column) => {
    if (!column || !Object.prototype.hasOwnProperty.call(requestBody, column)) {
      return extensionParameters.EMPTY_CELL;
    }
    if (allowedFields.length > 0 && !allowedFields.includes(column)) {
      return extensionParameters.EMPTY_CELL;
    }

    const value = normalize(requestBody[column]);
    delete requestBody[column];
    return value;
  }));

  const newColumns: string[] = [];

  const remainings = Object.keys(requestBody);
  if (remainings.length > 0) {
    remainings.forEach((remaining) => {
      if (allowedFields.length > 0 && !allowedFields.includes(remaining)) {
        return;
      }

      newColumns.push(remaining);
      values.push(normalize(requestBody[remaining]));
    });
  }

  return [newColumns, values];
}

export const saveRecord = functions.https.onRequest(applyAppCheck(async (request, response) => {
  if (request.method !== "POST") {
    response.status(400).send("Bad request, this endpoint only accepts POST requests").end();
    return;
  }

  const headerColumns = await getHeaderColumns();
  const [newHeaderColumns, newRow] = generateNewRow(headerColumns, request.body);

  await Promise.all([appendRow(newRow), setNewHeaderColumns(headerColumns, newHeaderColumns)]);

  response.status(204).send();
}, {appCheck: extensionParameters.APP_CHECK === "yes"}));
