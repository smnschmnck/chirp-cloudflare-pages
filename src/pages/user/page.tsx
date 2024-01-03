import { FC } from "react";
import { userRoute } from "./route";
import { trpc } from "../../utils/trpc";
import { PostsList } from "../../components/PostsList";
import { Spinner } from "../../components/ui/Spinner";

export const UserPage: FC = () => {
  const { params } = userRoute.useLoaderData();
  const { username } = params;
  const { data: userPosts } = trpc.getAllPostsByUser.useQuery({ username });
  const { data: userInfo, isLoading } = trpc.getUserInfo.useQuery({ username });

  if (isLoading) {
    <div className="flex h-full w-[2000px] flex-col border-x text-white">
      <Spinner />
    </div>;
  }

  return (
    <div className="flex h-full w-[2000px] flex-col border-x text-white">
      <div className="h-64 w-full border-b">
        <div className="h-1/2 bg-slate-500"></div>
        <div className="relative flex h-1/2 items-end p-4">
          <p className="text-xl font-medium">@{userInfo?.user.username}</p>
          <img
            src={userInfo?.user.profilePictureUrl ?? ""}
            className="absolute bottom-14 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-950"
          />
        </div>
      </div>
      <PostsList posts={userPosts ?? []} />
    </div>
  );
};
