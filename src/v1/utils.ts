import { LogicError} from "./logic/errors"
import { ERRORS} from "./constants/errors"
import { Checker} from "./validator/checker"
import { sendOtpEmail} from "./logic/emails"
import { rateLimiters} from "./logic/rateLimiters"

export function getCurrentTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

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

    if (rateLimiters.sendOtpOverall.isFull("")) {
     throw new LogicError(ERRORS.SYSTEM_RATE_LIMIT_EXCEEDED);
    }

    if (rateLimiters.sendOtpPerEmail.isFull(recipient_email)) {
      throw new LogicError(ERRORS.RECIPIENT_RATE_LIMIT_EXCEEDED);
    }
    
    await sendOtpEmail(sender_email, recipient_email, template_id, params)
    .then(() => {
      rateLimiters.sendOtpOverall.push("");
      rateLimiters.sendOtpPerEmail.push(recipient_email);
    })
    .catch((error: Error) => {
      throw error;
    })
}