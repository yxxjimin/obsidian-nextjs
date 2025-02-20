"use client";

import { Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { colors } from "@/colors";
import config from "@/config";
import { usePathname } from "next/navigation";

export default function Header() {
  const [sticky, setSticky] = useState<boolean>(false);
  const path = usePathname();

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
      position={"sticky"}
      top={"0"}
      zIndex={10}
      bgColor={colors.background}
      height={"70px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"1em"}
      shadow={sticky ? "md" : "none"}
    >
      <Link href={"/"}>
        <Text 
          textStyle={"xl"} 
          fontWeight={"700"} 
          fontFamily={"mono"}
          textDecoration={path === "/" ? "underline" : "none"}
        >
          {config.siteMetadata.title}
        </Text>
      </Link>
      <Stack direction={"row"} gap={4}>
        <Link href={"/posts"}>
          <Text 
            textStyle={"xl"} 
            fontWeight={"600"} 
            fontFamily={"mono"}
            textDecoration={path === "/posts" ? "underline" : "none"}
          >
            posts
          </Text>
        </Link>
        <Link href={"/projects"}>
          <Text 
            textStyle={"xl"} 
            fontWeight={"600"} 
            fontFamily={"mono"}
            textDecoration={path === "/projects" ? "underline" : "none"}
          >
            projects
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
}
