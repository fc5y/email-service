import validator from "validator";
import { TEMPLATES } from '../logic/templates';

export class Checker {
  isEmail(email: string) {
    return validator.isEmail(email, {});
  }

  isOtp(otp: string) {
    return validator.matches(otp, /^[0-9]{6}$/);
  }

  isTemplateId(templateId: number) {
    return Object.keys(TEMPLATES).includes(templateId.toString());
  }

  isParams(params: { [key: string]: string }) {
    return !(params.otp == null || params.displayed_name == null);
  }
}
