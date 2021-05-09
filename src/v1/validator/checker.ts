import { Validator} from "validator.ts/Validator";

const validator = new Validator();

export class Checker{

  isEmail(email: string) {
    if ( !validator.isEmail(email,{}) ) {
      return false;
    } else {
      return true;
    }
  }
        
  isOtp(otp: string) {
    if ( !validator.matches(otp,/^[0-9]{6}$/) ) {
      return false;
    } else {
      return true;
    }
  }

  isTemplateId(templateId: number) {
    if ( !(templateId == 10001) ) {
      return false;
    } else {
      return true;
    }
  }

  isParams(params: {[key: string]: string}) {
    if (params.otp == null || params.displayed_name == null) {
      return false;
    } else {
      return true;
    }
  }
}


