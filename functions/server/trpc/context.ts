import { Env } from "@functions/types/env";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { drizzle } from "drizzle-orm/d1";

type ContextOptions = FetchCreateContextFnOptions & {
  env: Env;
};

export function createContext({ req, resHeaders, env }: ContextOptions) {
  const db = drizzle(env.DB);
  return { req, resHeaders, db, env };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
