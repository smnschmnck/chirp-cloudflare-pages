import { FC } from "react";
import { userRoute } from "./route";
import { trpc } from "../../utils/trpc";
import { PostsList } from "../../components/PostsList";

export const UserPage: FC = () => {
  const { params } = userRoute.useLoaderData();
  const { data } = trpc.getAllPostsByUser.useQuery({
    username: params.username,
  });

  return (
    <div className="flex h-full w-full text-white">
      <PostsList posts={data ?? []} />
    </div>
  );
};
