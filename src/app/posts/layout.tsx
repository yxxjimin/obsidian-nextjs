import { Box } from "@chakra-ui/react";
import Sidebar from "@/app/posts/components/sidebar";
import { getAllPosts } from "@/app/posts/utils/parse";
import { ColorModeButton } from "@/components/ui/color-mode";
import { colors } from "@/colors";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();

  return (
    <Box
      as={"div"}
      display={"flex"}
      bgColor={colors.background}
      width={"100%"}
    >
      <Sidebar posts={posts} />
      <Box 
        as="main"
        marginX={"auto"}
        maxWidth={"48em"}
        overflowWrap={"break-word"}
      >
        <Box position={"fixed"} bottom={10} right={10}>
          <ColorModeButton />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
