import { RtcTokenBuilder, RtcRole } from "https://cdn.skypack.dev/agora-access-token@2.0.4";

export function createAgoraToken(channelName: string, uid: number, role: number, expireTime: number): string {
  const appID = "2f4bfd8b24604dd59bbfb49d5a0fe59a";  // Replace with your Agora App ID
  const appCertificate = "20b122e9321946fb9796ee5438abacb5";  // Replace with your Agora App Certificate
  const expirationTimeInSeconds = expireTime;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  return RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
}
