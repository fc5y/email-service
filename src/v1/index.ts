import { Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./utils";
import { sendOtp} from "./utils";
import { LogicError} from "./logic/errors"
import Knex from "knex"

export const knex = Knex ({
  client: "sqlite3",
  connection: {
    filename : "src/v1/email_service.db"
  }
});

const router = Router();

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
    })
  })
  .catch(( error: LogicError ) => {
    res.json({
      error: error.code,
      error_msg: error.msg,
    })
  })
});

export default router;
