import { Route } from "@tanstack/react-router";
import { HomePage } from "./page";
import { mainLayoutRoute } from "../../layouts/mainLayout/route";

export const homeRoute = new Route({
  getParentRoute: () => mainLayoutRoute,
  path: "/",
  component: HomePage,
});
