import { FC, FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";

export const Home: FC = () => {
  const { data: posts, refetch: refetchPosts } = trpc.getAllPosts.useQuery();
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
    <div className="w-full flex justify-center h-full bg-gray-950">
      <div className="flex flex-col border-x h-full text-white w-96">
        <form
          onSubmit={submitPost}
          className="min-h-20 px-4 gap-4 flex items-center w-full border-b"
        >
          <input
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Submit a post"
            className="w-full bg-transparent h-10 px-2"
          />
          <button className="h-10 px-4 bg-blue-500 rounded-md">Submit</button>
        </form>
        <div className="h-full overflow-y-scroll">
          <ul>
            {posts?.map((p) => (
              <li className="border-b h-12 flex px-4 items-center" key={p.id}>
                {p.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
