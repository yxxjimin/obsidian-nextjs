import { getAllPosts } from "@/app/posts/utils/parse";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
// import MarkdownRenderer from "@/app/posts/components/renderer";
import MDXProvider from "@/app/posts/components/provider";
import Capsule from "@/app/posts/components/capsule";
import Header from "@/components/header";
// import Sidebar from "@/app/posts/components/sidebar";
import MotionDiv from "@/app/posts/components/motion";
import "katex/dist/katex.min.css";

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
      <Box hideFrom={"lg"}>
        <Header />
      </Box>
      <Flex>
        {/* <Sidebar posts={posts} /> */}
        <Box 
          as="main"
          marginX={"auto"}
          width={"100%"}
          maxWidth={"48em"}
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
                  <Capsule key={tag} text={tag} href={`/posts?q=${tag}`}/>
                ))}
              </Stack>
              <Text textStyle={"sm"} fontFamily={"mono"}>
                lastmod: {post?.metadata.lastmod}
              </Text>
              {/* <Separator variant={"dashed"}/> */}
              <MDXProvider content={post?.content} />
            </Box>
          </MotionDiv>
        </Box>
      </Flex>
    </>
  );
}
