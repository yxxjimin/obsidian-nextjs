import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { colors } from "@/colors";

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      as={"div"}
      direction={"column"}
      bgColor={colors.background}
      width={"100%"}
    >
      {children}
      <Box position={"fixed"} bottom={10} right={10}>
        <ColorModeButton />
      </Box>
    </Flex>
  );
}
