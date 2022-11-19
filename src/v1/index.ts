import { Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./utils";
import { sendOtp } from "./utils";
import { LogicError } from "./logic/errors";
import { ERRORS } from "./constants/errors";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    error: 0,
    error_msg: "",
    // Format: https://docs.npmjs.com/cli/v7/configuring-npm/package-json
    data: {
      name: "email-service",
      version: "1.0.0",
      description: "Email Service v1",
      homepage: "",
      contributors: [
        {
          name: "Kien Nguyen",
          email: "kc97ble@gmail.com",
        },
        {
          name: "Bao-Hiep Le",
          email: "baohiep2013@gmail.com",
        },
      ],
    },
  });
});

router.get("/timestamp", (req: Request, res: Response) => {
  res.json({
    data: {
      timestamp: getCurrentTimestamp(),
    },
    error: 0,
    error_msg: "",
  });
});

router.post("/send", (req: Request, res: Response) => {
  sendOtp(
    req.body.sender_email,
    req.body.recipient_email,
    req.body.template_id,
    req.body.params
  )
    .then(() => {
      res.json({
        error: 0,
        error_msg: "",
      });
    })
    .catch((error: any) => {
      if (error instanceof LogicError) {
        res.json({
          error: error.code,
          error_msg: error.msg,
        });
      } else {
        const logicError = new LogicError(ERRORS.SEND_EMAIL_ERROR);
        res.json({
          error: logicError.code,
          error_msg: error.message,
        });
      }
    });
});

export default router;
