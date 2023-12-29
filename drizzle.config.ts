import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./functions/db/schema.ts",
  driver: "d1",
  dbCredentials: {
    dbName: "TODO_DB",
    wranglerConfigPath: "./wrangler.toml",
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
});
