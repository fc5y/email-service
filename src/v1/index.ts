import { Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./utils";
import { sendOtp} from "./utils";
import { LogicError} from "./logic/errors"

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
  .catch( (error: any) => {
    if (error instanceof LogicError) {
      res.json({
        error: error.code,
        error_msg: error.msg,
      }) 
    } else {
      res.json({
        error_msg: "Some errors occurred while sending OTP email."
      })
    }
  })
});

export default router;
