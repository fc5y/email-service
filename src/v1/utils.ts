import { LogicError} from "./utils/errors"
import { ERRORS} from "./constants/errors"
import { Checker} from "./validator/checker";
import { sendOtpEmail} from "./utils/emails"

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
    
    sendOtpEmail(sender_email, recipient_email, template_id, params)
}