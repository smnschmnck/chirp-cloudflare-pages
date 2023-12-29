import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  greet: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.name}, from tRPC`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
