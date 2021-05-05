import * as nodemailer from 'nodemailer';
import { createText} from "./constants/templates"
import { LogicError} from "./constants/errors"
import { ERRORS} from "./constants/errors"
import { checker} from "./validator/checker";
import { knex} from "./index";
import * as dotenv from 'dotenv';
import * as google from 'googleapis';

export function getCurrentTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

dotenv.config();

const oAtuh2Client = new google.Auth.OAuth2Client(process.env.CLIENT_ID,
                                                  process.env.CLIENT_SECRET,
                                                  process.env.REDIRECT_URI);
oAtuh2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

export async function sendOtp(
    sender_email: string, 
    recipient_email: string, 
    template_id: number,
    params: {[key: string]: string}
  ){

    const is_valid = await checker(sender_email, recipient_email, template_id, params);
    if (is_valid.code != 0) {
      return is_valid;
    } 

    const access_Token = (await oAtuh2Client.getAccessToken()).toString();
    const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: access_Token
      }
    });

    async function sendOtpEmail() {
      let options = { 
        from: sender_email, 
        to: recipient_email, 
        subject: "Mã xác minh (OTP)", 
        text: createText(template_id, params),
      }

      try {
        const info = await transporter.sendMail(options);

        knex("Mail_Sent_History").insert({
          recipient_email: recipient_email,
          Time: new Date().getTime()
        }).then( () =>{

        });

        return new LogicError(ERRORS.NO_ERROR); 
      } catch (info) {
        return new LogicError(ERRORS.SEND_EMAIL_ERROR);
      }
    }
    
    return await sendOtpEmail();
}