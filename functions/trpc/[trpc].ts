import { EventContext } from "@cloudflare/workers-types";
import { createContext } from "@functions/server/trpc/context";
import { appRouter } from "@functions/server/trpc/router";
import { Env } from "@functions/types/env";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export function onRequest(context: EventContext<Env, string, unknown>) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: context.request as unknown as Request,
    router: appRouter,
    createContext: (opts) => createContext({ env: context.env, ...opts }),
  });
}
