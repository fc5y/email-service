import * as Gmail from "@googleapis/gmail";
import { GoogleAuth, JWT } from "google-auth-library";
import MailComposer from "nodemailer/lib/mail-composer";

export class GmailSender {
  constructor(private gmail: Gmail.gmail_v1.Gmail) {}

  static create({
    serviceAccountKey,
    senderEmail,
    clientEmail,
  }: {
    // Google Cloud > APIs & Services > Credentials > Service Accounts
    serviceAccountKey: string;
    senderEmail: string;
    clientEmail: string;
  }) {
    const jwt = new JWT({
      key: serviceAccountKey,
      scopes: "https://mail.google.com/",
      subject: senderEmail,
      email: clientEmail,
    });
    const auth = new GoogleAuth({ authClient: jwt });
    const gmail = Gmail.gmail({ version: "v1", auth });
    return new GmailSender(gmail);
  }

  /**
   * http://nodemailer.com/extras/mailcomposer/#e-mail-message-fields
   */
  async send({
    subject,
    text,
    to,
    from,
  }: {
    subject: string;
    text: string;
    to: string;
    from: string;
  }) {
    const mail = new MailComposer({ from, to, subject, text });
    const buffer = await mail.compile().build();
    const result = await this.gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: buffer.toString("base64url") },
    });
    return result;
  }
}
