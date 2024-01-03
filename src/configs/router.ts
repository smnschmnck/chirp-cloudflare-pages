import { Outlet, RootRoute, Router } from "@tanstack/react-router";
import { homeRoute } from "../pages/home/route";
import { signInRoute } from "../pages/sign-in/route";

export const rootRoute = new RootRoute({
  component: Outlet,
});

const routeTree = rootRoute.addChildren([homeRoute, signInRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
