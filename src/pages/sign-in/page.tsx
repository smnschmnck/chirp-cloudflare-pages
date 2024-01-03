import { FC } from "react";

export const SignInPage: FC = () => {
  return (
    <div>
      <h1>pls sign in</h1>
      <a
        href="login/github"
        className="flex h-10 items-center justify-center rounded-full bg-blue-500 px-4 transition hover:bg-blue-400"
      >
        Sign in
      </a>
    </div>
  );
};
