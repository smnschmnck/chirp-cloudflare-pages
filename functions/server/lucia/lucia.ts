import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { web } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";
import { Env } from "@functions/types/env";

export const initializeLucia = (env: Env) => {
  const db = env.DB;
  const auth = lucia({
    adapter: d1(db, {
      user: "user",
      key: "user_key",
      session: "user_session",
    }),
    middleware: web(),
    sessionCookie: {
      expires: false,
    },
    getUserAttributes: (data) => {
      return {
        githubUsername: data.username,
      };
    },
    env: env.ENVIRONMENT === "development" ? "DEV" : "PROD",
  });
  return auth;
};

export const initializeGithubAuth = (env: Env) => {
  const luciaAuth = initializeLucia(env);
  const githubAuth = github(luciaAuth, {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  });

  return githubAuth;
};

export type Auth = ReturnType<typeof initializeLucia>;
