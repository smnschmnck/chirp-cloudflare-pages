import { Link } from "@tanstack/react-router";
import { FC } from "react";
import githubIcon from "../../assets/icons/github.svg";

export const SignInPage: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-28 text-white">
      <div className="w-full px-12 py-6">
        <Link className="text-xl font-medium" to="/">
          Chirp
        </Link>
      </div>
      <div className="flex w-96 flex-col gap-6 rounded-xl bg-gray-900 p-12">
        <div>
          <h1 className="text-xl font-medium">Welcome back</h1>
          <p className="text-gray-400">Please sign in to start posting</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <hr className="w-20 border-gray-600" />
        </div>
        <a
          href="login/github"
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 font-medium text-black transition hover:bg-gray-300"
        >
          <img src={githubIcon} className="h-6 w-6" />
          Sign in with GitHub
        </a>
      </div>
    </div>
  );
};
