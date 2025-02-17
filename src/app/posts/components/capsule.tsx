import { Box, Text } from "@chakra-ui/react";

type Props = {
  text: string;
}

export default function Capsule({ text }: Props) {
  return (
    <Box
      bgColor={"black"}
      paddingY={"0.375em"}
      paddingX={"0.75em"}
      borderRadius={"full"}
    >
      <Text textStyle={"xs"} color={"white"} fontFamily={"mono"}>{text}</Text>
    </Box>
  );
}
