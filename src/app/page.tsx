import Header from "@/components/header";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { colors } from "@/colors";

export default function Home() {
  return (
    <>
      <Header />
      <Flex 
        direction={"column"}
        justifyContent={"center"} 
        alignItems={"center"}
        flexGrow={1}
        gap={10}
      >
        <Text fontSize={"4xl"} fontFamily={"mono"} fontWeight={700}>
          {"👋 Hi!"}
        </Text>
        <Link href={"/posts"}>
          <Button 
            borderRadius={"full"}
            bgColor={colors.primary}
          >
            <Text 
              textStyle={"lg"} 
              fontFamily={"mono"}
              color={"white"}
            >
              Take a Look!
            </Text>
            <FaArrowRight color={"white"} />
          </Button>
        </Link>
      </Flex>
    </>
  );
}
