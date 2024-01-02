import { InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  content: text("content"),
  author: text("author", { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  created_at: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export type Post = InferSelectModel<typeof posts>;

export const user = sqliteTable("user", {
  id: text("id", { length: 15 }).notNull().primaryKey(),
  username: text("username").unique(),
});
export type User = InferSelectModel<typeof user>;

export const userKey = sqliteTable("user_key", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  userId: text("user_id", { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  hashedPassword: text("hashed_password", { length: 255 }),
});
export type UserKey = InferSelectModel<typeof userKey>;

export const userSession = sqliteTable("user_session", {
  id: text("id", { length: 127 }).notNull().primaryKey(),
  userId: text("user_id", { length: 15 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activeExpires: integer("active_expires", { mode: "number" }).notNull(),
  idleExpires: integer("idle_expires", { mode: "number" }).notNull(),
});
export type UserSession = InferSelectModel<typeof userSession>;
