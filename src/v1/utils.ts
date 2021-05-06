import * as nodemailer from 'nodemailer';
import { LogicError} from "./constants/errors"
import { ERRORS} from "./constants/errors"
import { Checker} from "./validator/checker";
import * as dotenv from 'dotenv';
import * as google from 'googleapis';
import { createEmailContent} from './constants/templates'

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

    const checker = new Checker();
    if ( !(checker.isEmail(sender_email)) ) {
      throw new LogicError(ERRORS.INVALID_SENDER_EMAIL);
    }
    if ( !(checker.isEmail(recipient_email)) ) {
      throw new LogicError(ERRORS.INVALID_RECIPIENT_EMAIL);
    }
    if ( !(checker.isParams(params)) ) {
      throw new LogicError(ERRORS.INVALID_PARAMS);
    }
    if ( !(checker.isOtp(params.otp)) ) {
      throw new LogicError(ERRORS.INVALID_OTP);
    }
    if ( !(checker.isTemplateId(template_id)) ) {
      throw new LogicError(ERRORS.INVALID_TEMPLATE_ID);
    }

    const accessToken = (await oAtuh2Client.getAccessToken()).toString();
    const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const emailContent = createEmailContent(10001, params);
    async function sendOtpEmail() {
      let options = { 
        from: sender_email, 
        to: recipient_email, 
        subject: emailContent.subject, 
        text: emailContent.text,
      }

      try {
        const info = await transporter.sendMail(options);
      } catch(info) {
        throw new LogicError(ERRORS.SEND_EMAIL_ERROR);
      }
    }
    
    await sendOtpEmail();
}