import { serve } from "https://deno.land/std/http/server.ts";
import { createAgoraToken } from "./agoraTokenGenerator.ts";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Only POST requests are allowed", { status: 405 });
  }

  const { channelName, uid, role, expireTime } = await req.json();

  if (!channelName || !uid || !role || !expireTime) {
    return new Response("Missing required parameters", { status: 400 });
  }

  try {
    const token = createAgoraToken(channelName, uid, role, expireTime);
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
