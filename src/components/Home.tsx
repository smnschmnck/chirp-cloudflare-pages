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
    <div>
      <form onSubmit={submitPost}>
        <input
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>{posts?.map((post) => <li>{post.content}</li>)}</ul>
    </div>
  );
};
