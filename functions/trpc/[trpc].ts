import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../server/router";
import { EventContext, D1Database } from "@cloudflare/workers-types";
import { createContext } from "../server/context";

type Env = {
  DB: D1Database;
};

export function onRequest(context: EventContext<Env, string, unknown>) {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: context.request as unknown as Request,
    router: appRouter,
    createContext,
  });
}
