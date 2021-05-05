import { Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./utils";
import { sendOtp} from "./utils";
import { LogicError} from "./constants/errors"
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
  .then((e: LogicError) =>{
    res.json({
      error: e.code,
      error_msg: e.msg
    })
  })
});

export default router;
