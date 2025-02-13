import { metadata } from "@/app/layout";
import { getAllPosts } from "@/app/notes/utils/parse";

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.metadata.slug,
  }));
}

export default async function Note({ 
  params 
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getAllPosts().find((post) => post.metadata.slug === slug);

  return (
    <div>
      <h1>{post?.metadata.title}</h1>
      <div>
        {post?.content}
      </div>
      <div>
        <ul>
          {post?.metadata.tags?.map((tag) => (
            <li key={tag}>
              Tagged: {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
