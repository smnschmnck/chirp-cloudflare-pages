import { initializeLucia } from "@functions/server/lucia/lucia";
import { Env } from "@functions/types/env";

export const onRequest = async ({
  env,
  request,
}: EventContext<Env, string, unknown>) => {
  const auth = initializeLucia(env);
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  const sessionCookie = auth.createSessionCookie(null);
  return new Response(null, {
    headers: {
      Location: "/",
      "Set-Cookie": sessionCookie.serialize(),
    },
    status: 302,
  });
};
