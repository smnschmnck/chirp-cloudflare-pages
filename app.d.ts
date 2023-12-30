/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./functions/server/lucia/lucia.ts").Auth;
  type DatabaseUserAttributes = { username: string };
  type DatabaseSessionAttributes = object;
}
