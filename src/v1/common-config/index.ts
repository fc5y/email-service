import dotenv from "dotenv";

dotenv.config();

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
export const PORT = process.env.PORT || "";
export const WHITELISTED_RECEIVERS = process.env.WHITELISTED_RECEIVERS || "";
export const SERVICE_ACCOUNT_PRIVATE_KEY__URL =
  process.env.SERVICE_ACCOUNT_PRIVATE_KEY__URL || "";
export const SERVICE_ACCOUNT_CLIENT_EMAIL =
  process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || "";

if (!SENDER_EMAIL) {
  throw new Error(`
    SENDER_EMAIL is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!PORT) {
  throw new Error(`
    PORT is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!WHITELISTED_RECEIVERS) {
  throw new Error(`
    WHITELISTED_RECEIVERS is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!SERVICE_ACCOUNT_PRIVATE_KEY__URL) {
  throw new Error(`
    SERVICE_ACCOUNT_PRIVATE_KEY__URL is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!SERVICE_ACCOUNT_CLIENT_EMAIL) {
  throw new Error(`
    SERVICE_ACCOUNT_CLIENT_EMAIL is empty.
    Make sure the environment variable is available in .env.
  `);
}
