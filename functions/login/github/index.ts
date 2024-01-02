import { EventContext } from "@cloudflare/workers-types";
import { serializeCookie } from "lucia/utils";
import { initializeGithubAuth } from "@functions/server/lucia/lucia";
import { Env } from "@functions/types/env";

export const onRequest = async (
  context: EventContext<Env, string, unknown>
) => {
  const { env } = context;
  const githubAuth = initializeGithubAuth(env);
  const [url, state] = await githubAuth.getAuthorizationUrl();
  const stateCookie = serializeCookie("github_oauth_state", state, {
    httpOnly: true,
    secure: env.ENVIRONMENT !== "development",
    path: "/",
    maxAge: 60 * 60,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": stateCookie,
    },
  });
};
