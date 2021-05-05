export const ERRORS = {
    NO_ERROR: {
        code: 0,
        msg: "",
    },
    SEND_EMAIL_ERROR: {
        code: 200000,
        msg: "Send email error",
    },
    INVALID_RECIPIENT_EMAIL: {
        code: 200001,
        msg: "Invalid recipient email",
    },
    INVALID_SENDER_EMAIL: {
        code: 200002,
        msg: "Invalid sender email",
    },
    INVALID_OTP: {
        code: 200003,
        msg: "Invalid OTP",
    },
    INVALID_TEMPLATE_ID: {
        code: 200004,
        msg: "Invalid template id. Must be 10001",
    },
    SYSTEM_RATE_LIMIT_EXCEEDED: {
        code: 200005,
        msg: "System rate limit exceeded"
    },
    RECIPIENT_RATE_LIMIT_EXCEEDED: {
        code: 200006,
        msg: "Recipient rate limit exceeded",
    },
    INVALID_PARAMS: {
        code: 200007,
        msg: "Invalid params. Must include displayed_name and otp",
    }
}

  
export class LogicError extends Error {
    code: number;
    msg: string;
    data: any;
    constructor({ code, msg, data }: any, ...params: any) {
      super(...params);
      this.code = code;
      this.msg = msg;
      this.data = data;
    }
  }