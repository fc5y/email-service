import { createEmailContent } from "./templates";
import {
  SENDER_EMAIL,
  SERVICE_ACCOUNT_CLIENT_EMAIL,
  SERVICE_ACCOUNT_PRIVATE_KEY__URL,
} from "../common-config/index";
import { GmailSender } from "../classes/GmailSender";

const gmailSender = GmailSender.create({
  serviceAccountKey: decodeURIComponent(SERVICE_ACCOUNT_PRIVATE_KEY__URL),
  senderEmail: SENDER_EMAIL,
  clientEmail: SERVICE_ACCOUNT_CLIENT_EMAIL,
});

export async function sendOtpEmail(
  sender_email: string,
  recipient_email: string,
  template_id: number,
  params: { [key: string]: string }
) {
  const emailContent = createEmailContent(template_id, params);

  return await gmailSender.send({
    from: sender_email,
    to: recipient_email,
    subject: emailContent.subject,
    text: emailContent.content,
  });
}
