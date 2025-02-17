import { getAllPosts } from "@/app/posts/utils/parse";
import { Box, Stack, Text } from "@chakra-ui/react";
// import MarkdownRenderer from "@/app/posts/components/renderer";
import MDXProvider from "@/app/posts/components/provider";
import Capsule from "@/app/posts/components/capsule";

interface Params {
  slug: string;
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((post) => ({
    slug: post.metadata.slug,
  }));
}

function getPost(params: Params) {
  return getAllPosts().find((post) => encodeURI(post.metadata.slug) === params.slug);
}

export default async function Post({ params }: { params: Promise<Params> }) {
  const post = getPost(await params);

  return (
    <Box
      as="article"
      maxWidth={"48em"} 
      padding={30}
    >
      <Text textStyle={"2xl"} fontWeight={"700"} marginY={"1em"}>
        {post?.metadata.title}
      </Text>
      <Text textStyle={"sm"} fontFamily={"mono"}>
        written: {post?.metadata.date}
      </Text>
      <Text textStyle={"sm"} fontFamily={"mono"}>
        lastmod: {post?.metadata.lastmod}
      </Text>
      <Stack direction={"row"} marginY={"1em"}>
        {post?.metadata.tags?.map((tag) => (
          <Capsule key={tag} text={tag} />
        ))}
      </Stack>
      <hr />
      <MDXProvider content={post?.content} />
    </Box>
  );
}
