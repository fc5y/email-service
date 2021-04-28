import { CustomError } from 'ts-custom-error'

export var errorName = {
    "NO_ERROR": 0,
    "SEND_EMAIL_ERROR": 200000, 
    "INVALID_RECIPIENT_EMAIL": 200001,
    "INVALID_SENDER_EMAIL": 200002,
    "INVALID_OTP": 200003,
    "INVALID_TEMPLATE_ID": 200004,
    "SYSTEM_RATE_LIMIT_EXCEEDED": 200005,
    "RECIPIENT_RATE_LIMIT_EXCEEDED": 200006,
    "INVALID_PARAMS": 200007
}

export var errorMap: string[] = [];

errorMap[errorName.NO_ERROR] = "";
errorMap[errorName.SEND_EMAIL_ERROR] = "Send email error";
errorMap[errorName.INVALID_RECIPIENT_EMAIL] = "Invalid recipient email";
errorMap[errorName.INVALID_SENDER_EMAIL] = "Invalid sender email";
errorMap[errorName.INVALID_OTP] = "Invalid otp";
errorMap[errorName.INVALID_TEMPLATE_ID] = "Invalid template id. Must be 10001";
errorMap[errorName.SYSTEM_RATE_LIMIT_EXCEEDED] = "System rate limit exceeded";
errorMap[errorName.RECIPIENT_RATE_LIMIT_EXCEEDED] = "Recipient rate limit exceeded"
errorMap[errorName.INVALID_PARAMS] = "Invalid params. Must include displayed_name and otp";

export class logicError extends CustomError {
    code: number;
    public constructor(
        _code: number,
    ) {
        super();
        this.message = errorMap[_code];
        this.code = _code;
    }
}