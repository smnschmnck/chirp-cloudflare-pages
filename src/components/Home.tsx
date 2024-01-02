import { FC, FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import { Spinner } from "./Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
      }
    );
  };

  return (
    <form
      onSubmit={submitPost}
      className="h-24 px-4 w-full border-b gap-4 flex items-center"
    >
      <input
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Post something"
        className="w-full bg-transparent h-10 px-4 rounded-full border border-gray-700"
      />
      <button className="h-10 px-4 bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-400 transition">
        Post
      </button>
    </form>
  );
};

dayjs.extend(relativeTime);

export const Home: FC = () => {
  const { data: user, isError: isUserError } = trpc.getUser.useQuery(
    undefined,
    {
      retry: (_, error) => error.data?.code !== "UNAUTHORIZED",
    }
  );
  const { data: posts, refetch: refetchPosts } = trpc.getAllPosts.useQuery();

  if (!!user && !!isUserError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center h-full bg-gray-950 text-white">
      <div className="px-12 py-6 w-full">
        <a className="font-bold text-xl" href="/">
          Chirp
        </a>
      </div>
      <div className="flex flex-col border-x h-full text-white min-w-96">
        {!!user && <CreatePostForm refetchPosts={refetchPosts} />}
        <div className="h-full overflow-y-scroll">
          <ul>
            {posts?.map((p) => (
              <li
                className="border-b h-16 flex px-4 flex-col justify-center"
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
      <div className="px-12 py-6 w-full flex justify-end items-start">
        {!user && (
          <a
            href="login/github"
            className="h-10 px-4 bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-400 transition"
          >
            Sign in
          </a>
        )}
        {!!user && (
          <div className="flex gap-4 items-center">
            <p className="font-bold">{user.user.githubUsername}</p>
            <a
              href="/logout"
              className="h-10 px-4 bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-400 transition"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
