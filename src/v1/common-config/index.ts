import dotenv from "dotenv";

dotenv.config();

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
export const CLIENT_ID = process.env.CLIENT_ID || "";
export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";
export const PORT = process.env.PORT || "";
export const WHITELISTED_RECEIVERS = process.env.WHITELISTED_RECEIVERS || "";

if (!SENDER_EMAIL) {
  throw new Error(`
    SENDER_EMAIL is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!CLIENT_ID) {
  throw new Error(`
    CLIENT_ID is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!CLIENT_SECRET) {
  throw new Error(`
    CLIENT_SECRET is empty.
    Make sure the environment variable is available in .env.
  `);
}

if (!REFRESH_TOKEN) {
  throw new Error(`
    REFRESH_TOKEN is empty.
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