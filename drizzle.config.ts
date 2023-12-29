import { Config } from "drizzle-kit";

export default {
  schema: "./functions/db/schema.ts",
  out: "./drizzle",
  driver: "d1",
  dbCredentials: {
    dbName: "CHIRP_DB",
    wranglerConfigPath: "./wrangler.toml",
  },
} satisfies Config;
