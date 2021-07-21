import { Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./utils";
import { sendOtp } from "./utils";
import { LogicError } from "./logic/errors";
import { generateAuthUrl, generateTokens } from "./logic/oauth2";
import { ERRORS } from "./constants/errors";

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
  sendOtp(req.body.sender_email, req.body.recipient_email, req.body.template_id, req.body.params)
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

router.get("/generate_tokens", (req: Request, res: Response) => {
  const authUrl = generateAuthUrl();
  res.send(`
    <html>
      <head>
        <style>
          label, input, textarea {
            display: block;
            width: 100%;
          }
        </style>
      </head>
      <body>
        Go to this url <a rel="nofollow" target="_blank" href="${authUrl}">${authUrl}</a>
        <br/><br/>
        <label>Paste the code here:</label>
        <input id="code" type="text" value=""/>
        <button onClick="submit()">Get tokens</button>
        <label>Response</label>
        <textarea id="response" readonly rows=10></textarea>
        <label>Error</label>
        <textarea id="error" readonly></textarea>
        <script>
          function submit() {
            const elCode = document.getElementById("code");
            const elResponse = document.getElementById("response");
            const elError = document.getElementById("error");

            fetch('/email/v1/generate_tokens', {
              method: 'POST',
              body: JSON.stringify({ code: elCode.value }),
              headers: { 'Content-Type': 'application/json' },
            })
              .then(response => response.text())
              .then((data) => {
                elResponse.value = data;
                elError.value = "";
              })
              .catch((error) => {
                console.log(error);
                console.log(error.toString());
                elResponse.value = "";
                elError.value = error.toString();
              });
          }
        </script>
      </body>
    </html>
  `);
});

router.post("/generate_tokens", async (req: Request, res: Response) => {
  try {
    const { access_token, refresh_token } = await generateTokens(req.body.code);
    res.json({
      error: 0,
      error_msg: "",
      data: { access_token, refresh_token },
    });
  } catch (err) {
    res.json({
      error: err.code,
      error_msg: err.message,
    });
  }
});

export default router;
