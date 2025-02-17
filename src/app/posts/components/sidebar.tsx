"use client";

import { Box, Input, List, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Post } from "@/app/posts/utils/parse";
import { useState } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";

export default function Sidebar({ posts }: { posts: Post[]; }) {
  const regex = /^\/posts\/([^/]+)$/;
  const match = usePathname().match(regex) || ["", ""];

  const [search, setSearch] = useState<string>("");

  return (
    <Box
      as={"aside"}
      hideBelow={"lg"}
      bgColor={"gray.100"}
      width={250}
      padding={"0.75rem"}
      height={"100vh"}
      position={"sticky"}
      top={"0"}
      borderRightWidth={1}
      borderRightColor={"gray.200"}
    >
      <Box>
        <Link href={"/posts"}>
          <Text 
            textStyle={"xl"} 
            fontWeight={"700"} 
            fontFamily={"mono"}
          >
            ://yxxjimin
          </Text>
        </Link>
        <InputGroup
          width={"100%"}
          endElement={<LuSearch />}
          marginBottom={"1em"}
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
                bgColor={match[1] === post.metadata.slug ? "black" : "none"} 
                borderRadius={"0.3em"}
                width={"100%"} 
                paddingY={"0.25em"}
                paddingX={"0.5em"}
                _hover={{
                  bg: match[1] === post.metadata.slug ? "black" : "gray.200"
                }}
              >
                <Link href={`/posts/${post.metadata.slug}`}>
                  <Text 
                    textStyle={"sm"} 
                    fontWeight={"500"} 
                    color={match[1] === post.metadata.slug ? "white" : "black"}
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
