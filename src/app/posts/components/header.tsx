"use client";

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { colors } from "@/colors";

export default function Header() {

  const [sticky, setSticky] = useState<boolean>(false);

  const handleScroll = () => {
    setSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      as={"header"}
      hideFrom={"lg"}
      position={"sticky"}
      top={"0"}
      bgColor={colors.background}
      height={"70px"}
      alignItems={"center"}
      padding={"1em"}
      borderBottomWidth={1}
      borderBottomColor={colors.border}
      shadow={sticky ? "md" : "none"}
    >
      <Link href={"/posts"}>
        <Text 
          textStyle={"xl"} 
          fontWeight={"700"} 
          fontFamily={"mono"}
        >
          ://yxxjimin
        </Text>
      </Link>
    </Flex>
  );
}
