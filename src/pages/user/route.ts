import { Route } from "@tanstack/react-router";
import { UserPage } from "./page";
import { mainLayoutRoute } from "../../layouts/mainLayout/route";

export const userRoute = new Route({
  getParentRoute: () => mainLayoutRoute,
  path: "/user/$username",
  component: UserPage,
  loader: ({ params }) => {
    return { params };
  },
});
