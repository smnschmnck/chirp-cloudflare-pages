import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { Home } from "../components/Home";

const rootRoute = new RootRoute({
  component: Outlet,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
