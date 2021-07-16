import * as google from "googleapis";
import * as nodemailer from "nodemailer";
import { createEmailContent } from "./templates";
import { SENDER_EMAIL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from "../common-config/index";

const oAuth2Client = new google.Auth.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function sendOtpEmail(
  sender_email: string,
  recipient_email: string,
  template_id: number,
  params: { [key: string]: string },
) {
  const accessToken = (await oAuth2Client.getAccessToken()).toString();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const emailContent = createEmailContent(template_id, params);

  const options = {
    from: sender_email,
    to: recipient_email,
    subject: emailContent.subject,
    text: emailContent.content,
  };

  const info = await transporter.sendMail(options);
  return info;
}
