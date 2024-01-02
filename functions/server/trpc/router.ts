import { posts } from "@functions/db/schema";
import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
import { z } from "zod";
import { desc } from "drizzle-orm";
import { initializeLucia } from "../lucia/lucia";

export const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;

const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const { req } = ctx;
  const auth = initializeLucia(ctx.env);
  const authRequest = auth.handleRequest(req);
  const session = await authRequest.validate();

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        user: session.user,
      },
    },
  });
});

export const appRouter = t.router({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.created_at))
      .limit(100);
    return allPosts;
  }),
  createPost: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      await db.insert(posts).values({
        id: crypto.randomUUID(),
        content: input.content,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
