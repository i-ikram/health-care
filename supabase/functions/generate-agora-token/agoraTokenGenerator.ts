import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";
import { encode as base64Encode } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const VERSION = "1";

function generateToken(appID: string, appCertificate: string, channelName: string, uid: string | number, role: number, privilegeExpiredTs: number): string {
  const unixTs = Math.floor(Date.now() / 1000);
  const randomInt = Math.floor(Math.random() * 0xFFFFFFFF);
  const ts = unixTs & 0xFFFFFFFF;
  const uidStr = uid === 0 ? "" : uid.toString();
  const message = `${appID}${channelName}${uidStr}${ts}${randomInt}${privilegeExpiredTs}`;
  const signature = hmac("sha256", appCertificate, message, "utf8", "hex");
  const content = `${signature}${appID}${ts}${randomInt}${privilegeExpiredTs}`;
  return `${VERSION}${base64Encode(new TextEncoder().encode(content))}`;
}

export function createAgoraToken(channelName: string, uid: number, role: number, expireTime: number): string {
  const appID = "2f4bfd8b24604dd59bbfb49d5a0fe59a";  // Replace with your Agora App ID
  const appCertificate = "20b122e9321946fb9796ee5438abacb5";  // Replace with your Agora App Certificate
  const expirationTimeInSeconds = expireTime;
  const privilegeExpiredTs = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;

  return generateToken(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
}
