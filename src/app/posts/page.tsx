import { Flex, Text } from "@chakra-ui/react";
import { getAllPosts } from "@/app/posts/utils/parse";
import Header from "@/components/header";
import PostList from "@/app/posts/components/postlist";

export default function Page() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <Flex
        direction={"column"}
        width={"100%"}
        maxWidth={768}
        margin={"20px auto"}
        padding={"1em"}
        gap={4}
      >
        <Text 
          textStyle={"xl"} 
          fontWeight={700}
          fontFamily={"mono"}
        >
          Posts
        </Text>
        <PostList posts={posts} />
      </Flex>
    </>
  );
}
