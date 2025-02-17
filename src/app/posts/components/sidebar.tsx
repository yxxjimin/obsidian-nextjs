"use client";

import { Box, Flex, Input, List, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Post } from "@/app/posts/utils/parse";
import { useState } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";

export default function Sidebar({ posts }: { posts: Post[]; }) {
  const regex = /^\/posts\/([^/]+)$/;
  const match = usePathname().match(regex) || ["", ""];

  const [search, setSearch] = useState<string>("");

  const isMatchingSlug = (slug: string) => (
    match[1] === encodeURI(slug)
  );

  return (
    <Box
      as={"aside"}
      hideBelow={"lg"}
      bgColor={"gray.100"}
      width={250}
      paddingX={"0.75rem"}
      height={"100vh"}
      position={"sticky"}
      overflowY="auto"
      top={"0"}
      borderRightWidth={1}
      borderRightColor={"gray.200"}
    >
      <Box 
        position={"sticky"} 
        top={"0"} 
        bgColor={"gray.100"} 
        paddingY={"0.75rem"}
      >
        <Flex 
          direction={"row"} 
          justifyContent={"space-between"} 
          alignItems={"center"}
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
          <Link href={"https://github.com/yxxjimin"}>
            <FaGithub size={25} />
          </Link>
        </Flex>
        <InputGroup
          width={"100%"}
          endElement={<LuSearch />}
        >
          <Input 
            variant={"flushed"} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            fontFamily={"mono"}
          />
        </InputGroup>
      </Box>
      <nav>
        <List.Root as="ul" variant={"plain"} gap={1}>
          {posts
          .filter((post) => (
            post.metadata.title.toLowerCase().includes(search.toLowerCase())
          ))
          .map((post) => (
            <List.Item key={post.metadata.slug}>
              <Box 
                bgColor={isMatchingSlug(post.metadata.slug) ? "black" : "none"} 
                borderRadius={"0.3em"}
                width={"100%"} 
                paddingY={"0.25em"}
                paddingX={"0.5em"}
                _hover={{
                  bg: isMatchingSlug(post.metadata.slug) ? "black" : "gray.200"
                }}
              >
                <Link href={`/posts/${post.metadata.slug}`}>
                  <Text 
                    textStyle={"sm"} 
                    fontWeight={"500"} 
                    color={isMatchingSlug(post.metadata.slug) ? "white" : "black"}
                  >
                    {post.metadata.title}
                  </Text>
                </Link>
              </Box>
            </List.Item>
          ))}
        </List.Root>
      </nav>
    </Box>
  );
}
