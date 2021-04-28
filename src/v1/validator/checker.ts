import { Validator} from "validator.ts/Validator";
import { logicError} from "../constants/errors"
import { errorName} from "../constants/errors";
import { knex } from "..";

const validator = new Validator();

const FIVE_MINUTES = 300000;
const ONE_MINUTES = 60000;
const SYSTEM_EMAIL_RATE_LIMIT = 500;
const RECIPIENT_EMAIL_RATE_LIMIT = 5;

export async function checker(
        sender_email: string, 
        recipient_email: string, 
        template_id: number,
        params: {[key: string]: string}
    ){
        
        if (validator.isEmail(sender_email,{}) == false) {
            return new logicError(errorName.INVALID_SENDER_EMAIL)
        }
      
        if (validator.isEmail(recipient_email,{}) == false) {
          return new logicError(errorName.INVALID_RECIPIENT_EMAIL)
        }
        
        if (params.otp == null || params.displayed_name == null) {
          return new logicError(errorName.INVALID_PARAMS);
        }
        
        if (validator.matches(params.otp,/^[0-9]{6}$/) == false) {
          return new logicError(errorName.INVALID_OTP);
        }
      
        if (template_id<10001 || template_id != 10001) {
          return new logicError(errorName.INVALID_TEMPLATE_ID);
        }

        const sentMailNumber = await knex('Mail_Sent_History')
                                     .count('* as CNT');
        if (sentMailNumber[0].CNT >= SYSTEM_EMAIL_RATE_LIMIT) {
          const row = await knex.select('Time')
                                .from('Mail_Sent_History')
                                .limit(1)
                                .offset(sentMailNumber[0].CNT - SYSTEM_EMAIL_RATE_LIMIT);
          if ((new Date().getTime()) - row[0].Time < ONE_MINUTES) {
            return new logicError (errorName.SYSTEM_RATE_LIMIT_EXCEEDED);
          }
        }

        const num = await knex('Mail_Sent_History')
                          .count('* as CNT')
                          .where('recipient_email',recipient_email);
        const lastTime = await knex('Mail_Sent_History')
                        .select('*')
                        .where('recipient_email',recipient_email)
                        .limit(1)
                        .offset(num[0].CNT - RECIPIENT_EMAIL_RATE_LIMIT);
        if ((new Date().getTime()) - lastTime[0].Time < FIVE_MINUTES) {
          return new logicError(errorName.RECIPIENT_RATE_LIMIT_EXCEEDED)
        }

        return new logicError(errorName.NO_ERROR);
}
