import { Route } from "@tanstack/react-router";
import { rootRoute } from "../../configs/router";
import { SignInPage } from "./page";

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: SignInPage,
});
