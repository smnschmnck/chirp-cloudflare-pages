import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { web } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";

export const initializeLucia = (db: D1Database) => {
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
    //TODO: Add actual env
    env: "DEV",
  });
  return auth;
};

export const initializeGithubAuth = (db: D1Database) => {
  const luciaAuth = initializeLucia(db);
  const githubAuth = github(luciaAuth, {
    //TODO add creds
    clientId: "TODO",
    clientSecret: "TODO",
  });

  return githubAuth;
};

export type Auth = ReturnType<typeof initializeLucia>;
