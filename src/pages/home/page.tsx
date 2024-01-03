import { FC, FormEvent, useState } from "react";
import { PostsList } from "../../components/PostsList";
import { Spinner } from "../../components/ui/Spinner";
import { trpc } from "../../utils/trpc";

const CreatePostForm: FC<{ refetchPosts: () => void }> = ({ refetchPosts }) => {
  const [postContent, setPostContent] = useState("");
  const { mutate: sendPost } = trpc.createPost.useMutation();

  const submitPost = (event: FormEvent) => {
    event.preventDefault();
    sendPost(
      { content: postContent },
      {
        onSuccess: () => {
          refetchPosts();
          setPostContent("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={submitPost}
      className="flex h-24 w-full items-center gap-4 border-b px-4"
    >
      <input
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Post something"
        className="h-10 w-full rounded-full border border-gray-700 bg-transparent px-4"
      />
      <button className="flex h-10 items-center justify-center rounded-full bg-blue-500 px-4 transition hover:bg-blue-400">
        Post
      </button>
    </form>
  );
};

export const HomePage: FC = () => {
  const { data: userData, isLoading: isLoadingUser } = trpc.getUser.useQuery();
  const { data: posts, refetch: refetchPosts } = trpc.getAllPosts.useQuery();

  if (isLoadingUser) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const hasUser = !!userData?.user;

  return (
    <div className="flex h-full min-w-96 max-w-96 flex-col border-x text-white">
      {hasUser && <CreatePostForm refetchPosts={refetchPosts} />}
      <PostsList posts={posts ?? []} />
    </div>
  );
};
