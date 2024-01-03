import { Route } from "@tanstack/react-router";
import { MainLayout } from "./layout";
import { rootRoute } from "../../configs/router";

export const mainLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "mainLayout",
  component: MainLayout,
});
