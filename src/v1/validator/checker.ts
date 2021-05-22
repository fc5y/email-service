import validator from 'validator';

export class Checker{

  isEmail(email: string) {
    return validator.isEmail(email,{});
  }
        
  isOtp(otp: string) {
    return validator.matches(otp,/^[0-9]{6}$/);

  }

  isTemplateId(templateId: number) {
    return templateId === 10001 ;
  }

  isParams(params: {[key: string]: string}) {
    return !(params.otp == null || params.displayed_name == null);
  }
}


