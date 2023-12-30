import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../server/trpc/router";
import { EventContext, D1Database } from "@cloudflare/workers-types";
import { createContext } from "../server/trpc/context";

export type Env = {
  DB: D1Database;
};

export function onRequest(context: EventContext<Env, string, unknown>) {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: context.request as unknown as Request,
    router: appRouter,
    createContext: (opts) => createContext({ env: context.env, ...opts }),
  });
}
