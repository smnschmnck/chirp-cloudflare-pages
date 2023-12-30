import { User, UserSession } from "@functions/db/schema.ts";

declare namespace Lucia {
  type Auth = import("./functions/server/lucia/lucia.ts").Auth;
  type DatabaseUserAttributes = User;
  type DatabaseSessionAttributes = UserSession;
}
