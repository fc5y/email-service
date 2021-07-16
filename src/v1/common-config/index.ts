import dotenv from "dotenv";

dotenv.config();

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
export const CLIENT_ID = process.env.CLIENT_ID || "";
export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
export const REDIRECT_URI = process.env.REDIRECT_URI || "";
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";
export const PORT = process.env.PORT || "";

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

if (!REDIRECT_URI) {
  throw new Error(`
    REDIRECT_URI is empty.
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
