import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../functions/server/router";

export const trpc = createTRPCReact<AppRouter>();
