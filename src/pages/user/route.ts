import { Route } from "@tanstack/react-router";
import { rootRoute } from "../../configs/router";
import { UserPage } from "./page";

export const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/user/$username",
  component: UserPage,
  loader: ({ params }) => {
    return { params };
  },
});
