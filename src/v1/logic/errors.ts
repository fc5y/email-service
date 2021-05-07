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