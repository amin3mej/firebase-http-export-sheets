import type * as functions from "firebase-functions";

export type HttpsOnRequestHandler = Parameters<typeof functions.https.onRequest>[0];
export type Request = functions.https.Request;
export type Response = functions.Response;
