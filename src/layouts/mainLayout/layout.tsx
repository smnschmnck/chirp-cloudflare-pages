import { Link, Outlet } from "@tanstack/react-router";
import { FC } from "react";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../../components/ui/Spinner";

export const MainLayout: FC = () => {
  const { data: userData, isLoading: isLoadingUser } = trpc.getUser.useQuery();

  if (isLoadingUser) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const hasUser = !!userData?.user;
  return (
    <div className="flex h-full w-full justify-center bg-gray-950 text-white">
      <div className="w-full px-12 py-6">
        <Link className="text-xl font-medium" to="/">
          Chirp
        </Link>
      </div>
      <Outlet />
      <div className="flex w-full items-start justify-end px-12 py-6">
        {!hasUser && (
          <Link
            to="/sign-in"
            className="flex h-10 items-center justify-center rounded-full bg-blue-500 px-4 transition hover:bg-blue-400"
          >
            Sign in
          </Link>
        )}
        {hasUser && (
          <div className="flex items-center gap-4">
            <p className="font-bold">{userData.user.githubUsername}</p>
            <a
              href="/logout"
              className="flex h-10 items-center justify-center rounded-full bg-blue-500 px-4 transition hover:bg-blue-400"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
