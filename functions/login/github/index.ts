import { EventContext } from "@cloudflare/workers-types";
import { serializeCookie } from "lucia/utils";
import { initializeGithubAuth } from "@functions/server/lucia/lucia";
import { Env } from "@functions/types/env";

export const onRequest = async (
  context: EventContext<Env, string, unknown>
) => {
  const githubAuth = initializeGithubAuth(context.env.DB);
  const [url, state] = await githubAuth.getAuthorizationUrl();
  const stateCookie = serializeCookie("github_oauth_state", state, {
    httpOnly: true,
    secure: false, //TODO `true` for production
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
