import { FC, FormEvent, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../../components/Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@tanstack/react-router";

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

dayjs.extend(relativeTime);

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
    <div className="flex h-full w-full justify-center bg-gray-950 text-white">
      <div className="w-full px-12 py-6">
        <Link className="text-xl font-medium" to="/">
          Chirp
        </Link>
      </div>
      <div className="flex h-full min-w-96 max-w-96 flex-col border-x text-white">
        {hasUser && <CreatePostForm refetchPosts={refetchPosts} />}
        <div className="h-full overflow-y-scroll">
          <ul>
            {posts?.map((p) => (
              <li
                className="flex min-h-16 max-w-full flex-col justify-center border-b px-4 py-2"
                key={p.id}
              >
                <div className="flex justify-between text-sm">
                  <p>{p.author}</p>
                  <p className="text-gray-500">
                    {dayjs(p.timestamp).fromNow()}
                  </p>
                </div>
                <p>{p.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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