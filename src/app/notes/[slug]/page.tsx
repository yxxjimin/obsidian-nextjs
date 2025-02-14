import { getAllPosts } from "@/app/notes/utils/parse";
import { Box } from "@chakra-ui/react";
import MarkdownRenderer from "@/app/notes/components/renderer";
import MDXProvider from "@/app/notes/components/provider";

interface Params {
  slug: string;
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((post) => ({
    slug: post.metadata.slug,
  }));
}

async function getPost(params: Params) {
  return getAllPosts().find((post) => post.metadata.slug === params.slug);
}

export default async function Note({ params }: { params: Params }) {
  const post = await getPost(params);

  return (
    <div>
      <h1>{post?.metadata.title}</h1>
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        maxWidth={900}
        margin="50px auto"
        padding={50}
      >
        <MDXProvider content={post?.content} />
        {/* <MarkdownRenderer content={post?.content} /> */}
      </Box>
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
