import * as google from "googleapis";
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from "../common-config/index";

const oAuth2Client = new google.Auth.OAuth2Client(CLIENT_ID, CLIENT_SECRET, "urn:ietf:wg:oauth:2.0:oob");
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export function generateAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://mail.google.com/",
  });
}

export async function generateTokens(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  };
}

export async function getAccessToken() {
  const accessToken = (await oAuth2Client.getAccessToken()).token as string;
  return accessToken;
}
