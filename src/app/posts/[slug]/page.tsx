import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import MDXProvider from "@/components/provider";
import Capsule from "@/components/capsule";
import { Header } from "@/components/header";
import { MotionDiv } from "@/components/motion";
import "katex/dist/katex.min.css";
import { getAllPosts } from "@/lib/posts";

interface Params {
  slug: string;
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((post) => ({
    slug: post.metadata.slug,
  }));
}

export default async function Post({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((post) => encodeURI(post.metadata.slug) === slug);

  return (
    <>
      <Header />
      <Flex>
        <Box 
          as="main"
          marginX={"auto"}
          width={"100%"}
          maxWidth={"48rem"}
          overflowWrap={"break-word"}
        >
          <MotionDiv>
            <Box
              as="article"
              maxWidth={"48em"} 
              padding={30}
            >
              <Text textStyle={"2xl"} fontWeight={"700"} marginY={"1em"}>
                {post?.metadata.title}
              </Text>
              <Stack direction={"row"} marginY={"1em"} wrap={"wrap"}>
                {post?.metadata.tags?.map((tag) => (
                  <Capsule key={tag} text={tag} />
                ))}
              </Stack>
              <Text textStyle={"sm"} fontFamily={"mono"}>
                lastmod: {post?.metadata.lastmod}
              </Text>
              <MDXProvider content={post?.content} />
            </Box>
          </MotionDiv>
        </Box>
      </Flex>
    </>
  );
}
