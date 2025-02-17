import { Box } from "@chakra-ui/react";
import Sidebar from "@/app/posts/components/sidebar";
import { getAllPosts } from "@/app/posts/utils/parse";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();

  return (
    <Box
      as={'div'}
      display={'flex'}
      bgColor={'white'}
      width={'100%'}
    >
      <Sidebar posts={posts} />
      <Box 
        as="main"
        margin={"auto"}
        maxWidth={"48em"}
        overflowWrap={"break-word"}
      >
        {children}
      </Box>
    </Box>
  );
}
