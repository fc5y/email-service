import { getCurrentTimestamp } from "../utils";

class RateLimiter {
  limit: number;
  interval:number;
  queue: any[];
  constructor({ limit, interval } : {[key:string]:number}) {
    this.limit = limit;
    this.interval = interval;
    this.queue = [];
  }

  _clean() {
    const currentTimestamp = getCurrentTimestamp();
    while (
      this.queue.length > 0 &&
      currentTimestamp - this.queue[0].createdAt > this.interval
    ) {
      this.queue.shift();
    }
  }

  isFull(key: string) {
    this._clean();
    const numQueued = this.queue.filter((item) => item.key === key).length;
    return (numQueued >= this.limit);
  }

  push(key: string) {
    this._clean();
    const currentTimestamp = getCurrentTimestamp();
    this.queue.push({ createdAt: currentTimestamp, key });
  }
}

export const rateLimiters = {
  sendOtpPerEmail: new RateLimiter({ limit: 5, interval: 300 }), // 5 OTPs in 5 minutes
  sendOtpOverall: new RateLimiter({ limit: 500, interval: 60 }), // 500 OTPs in 1 minute
};
