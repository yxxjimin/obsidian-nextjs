import { Flex } from "@chakra-ui/react";
import PostCard from "@/app/posts/components/postcard";
import { getAllPosts } from "@/app/posts/utils/parse";
import Header from "@/app/posts/components/header";

export default function Page() {
  return (
    <>
      <Header />
      <Flex
        direction={"column"}
        alignItems={"center"}
        width={"100%"}
        maxWidth={768}
        margin={"50px auto"}
        padding={"1em"}
        gap={4}
      >
        {getAllPosts().map((post) => (
          <PostCard key={post.metadata.title} post={post} />
        ))}
      </Flex>
    </>
  );
}
