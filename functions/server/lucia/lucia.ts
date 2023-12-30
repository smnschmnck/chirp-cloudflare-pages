import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { web } from "lucia/middleware";

export const initializeLucia = (db: D1Database) => {
  const auth = lucia({
    adapter: d1(db, {
      user: "user",
      key: "user_key",
      session: "user_session",
    }),
    middleware: web(),
    //TODO: Add actual env
    env: "DEV",
  });
  return auth;
};

export type Auth = ReturnType<typeof initializeLucia>;
