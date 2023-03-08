import firebaseAdmin from "firebase-admin";
import {HttpsOnRequestHandler, Request, Response} from "./types";

export function applyAppCheck(handler: HttpsOnRequestHandler, {appCheck = false} = {}) {
  return async (req: Request, res: Response) => {
    if (!appCheck) {
      return handler(req, res);
    }


    const appCheckToken = req.header("X-Firebase-AppCheck");
    try {
      await firebaseAdmin.appCheck().verifyToken(appCheckToken ?? "");
      return handler(req, res);
    } catch (err) {
      res.status(401).send("Unauthorized");
      return;
    }
  };
}
