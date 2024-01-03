import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FC } from "react";

dayjs.extend(relativeTime);

type Post = {
  content: string | null;
  id: string;
  author: string | null;
  authorPicture: string | null;
  timestamp: string;
};

export const PostsList: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="h-full w-full overflow-y-scroll">
      <ul>
        {posts.map((p) => (
          <li
            key={p.id}
            className="flex min-h-16 max-w-full items-center gap-3 border-b px-4 py-2"
          >
            <img
              src={p.authorPicture ?? ""}
              className="h-10 w-10 overflow-hidden rounded-full"
            />
            <div className="grow">
              <div className="flex justify-between text-sm">
                <Link
                  to="/user/$username"
                  params={{
                    username: p.author ?? "",
                  }}
                >
                  @{p.author}
                </Link>
                <p className="text-gray-500">{dayjs(p.timestamp).fromNow()}</p>
              </div>
              <p>{p.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
