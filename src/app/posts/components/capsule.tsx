import { colors } from "@/colors";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  text: string;
  href?: string;
}

export default function Capsule({ text, href }: Props) {
  const child = (
    <Box
      bgColor={colors.primary}
      paddingY={"0.375em"}
      paddingX={"0.75em"}
      borderRadius={"full"}
    >
      <Text textStyle={"xs"} color={"white"} fontFamily={"mono"}>{text}</Text>
    </Box>
  );

  return (href) ? (
    <Link href={href}>{child}</Link>
  ): (
    child
  );
}
