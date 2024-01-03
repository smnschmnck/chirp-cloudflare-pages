import { Outlet, RootRoute, Router } from "@tanstack/react-router";
import { homeRoute } from "../pages/home/route";
import { signInRoute } from "../pages/sign-in/route";
import { userRoute } from "../pages/user/route";
import { mainLayoutRoute } from "../layouts/mainLayout/route";

export const rootRoute = new RootRoute({
  component: Outlet,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  signInRoute,
  userRoute,
  mainLayoutRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
