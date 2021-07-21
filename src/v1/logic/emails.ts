import * as nodemailer from "nodemailer";
import { getAccessToken } from './oauth2'
import { createEmailContent } from "./templates";
import { SENDER_EMAIL, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from "../common-config/index";

export async function sendOtpEmail(
  sender_email: string,
  recipient_email: string,
  template_id: number,
  params: { [key: string]: string },
) {
  const accessToken = await getAccessToken();
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
