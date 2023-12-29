import { posts } from "@functions/db/schema";
import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { z } from "zod";
import { desc } from "drizzle-orm";

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getAllPosts: t.procedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.created_at))
      .limit(100);
    return allPosts;
  }),
  createPost: t.procedure
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
