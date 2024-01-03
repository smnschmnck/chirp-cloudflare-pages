/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./functions/server/lucia/lucia.ts").Auth;
  type DatabaseUserAttributes = {
    username: string;
    profile_picture_url?: string;
  };
  type DatabaseSessionAttributes = object;
}
