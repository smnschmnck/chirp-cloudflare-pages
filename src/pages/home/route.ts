import { Route } from "@tanstack/react-router";
import { rootRoute } from "../../configs/router";
import { HomePage } from "./page";

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
