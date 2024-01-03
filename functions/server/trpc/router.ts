import { posts, user } from "@functions/db/schema";
import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
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
  getUser: publicProcedure.query(async ({ ctx }) => {
    const { req } = ctx;
    const auth = initializeLucia(ctx.env);
    const authRequest = auth.handleRequest(req);
    const session = await authRequest.validate();

    return {
      user: session?.user,
    } as const;
  }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const allPosts = await db
      .select({
        id: posts.id,
        content: posts.content,
        author: user.username,
        authorPicture: user.profilePictureUrl,
        timestamp: posts.created_at,
      })
      .from(posts)
      .innerJoin(user, eq(posts.author, user.id))
      .orderBy(desc(posts.created_at))
      .limit(100);
    return allPosts;
  }),
  getAllPostsByUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const allPosts = await db
        .select({
          id: posts.id,
          content: posts.content,
          author: user.username,
          authorPicture: user.profilePictureUrl,
          timestamp: posts.created_at,
        })
        .from(posts)
        .where(eq(posts.author, input.username))
        .innerJoin(user, eq(posts.author, user.id))
        .orderBy(desc(posts.created_at))
        .limit(100);
      return allPosts;
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      await db.insert(posts).values({
        id: crypto.randomUUID(),
        author: session.user.userId,
        content: input.content,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
