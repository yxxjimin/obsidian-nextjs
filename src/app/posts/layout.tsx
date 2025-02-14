import { ReactNode } from "react";
import { getAllPosts } from "./utils/parse";
import Link from "next/link";

export default function NoteLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Hello This is the Layout!</h1>
      <ul>
        {getAllPosts().map((post) => (
          <li key={post.metadata.slug}>
            <Link href={`/posts/${post.metadata.slug}`}>
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {children}
      </div>
    </div>
  );
}
