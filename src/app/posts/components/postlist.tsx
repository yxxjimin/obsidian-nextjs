"use client";

import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Post } from "@/app/posts/utils/parse"
import PostCard from "@/app/posts/components/postcard";
import { useState } from "react";
import { colors } from "@/colors";
import { useSearchParams } from "next/navigation";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "@/components/ui/pagination";

type Props = {
  posts: Post[];
};

function getTagsCnt(posts: Post[]) {
  const freq = new Map<string, number>();
  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => {
      freq.set(tag, (freq.get(tag) || 0) + 1);
    });
  });

  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
}

export default function PostList({ posts }: Props) {
  const tagsCnt = getTagsCnt(posts);
  const searchParams = useSearchParams();
  const searchParamTag = searchParams.get("q");
  const initialTags = searchParamTag 
    ? new Set<string>([searchParamTag]) 
    : new Set<string>();

  const [selectedTags, setSelectedTags] = useState<Set<string>>(initialTags);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  // Filter posts based on selected tags
  const filteredPosts = posts.filter((post) => (
    selectedTags.size === 0 
      ? true 
      : post.metadata.tags?.some((tag) => selectedTags.has(tag))
  ));

  // Paginate
  const totalPosts = filteredPosts.length;
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <>
      <Stack direction={"row"} marginY={"1em"} wrap={"wrap"}>
        {tagsCnt.map(([tag, cnt]) => (
          <Button
            key={tag}
            bgColor={selectedTags.has(tag) ? colors.primary : "white"}
            borderColor={colors.border}
            borderRadius={"full"}
            onClick={() => {
              setSelectedTags((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(tag)) {
                  newSet.delete(tag);
                } else {
                  newSet.add(tag);
                }
                setCurrentPage(1);
                return newSet;
              });
            }}
          >
            <Text 
              textStyle={"sm"} 
              color={selectedTags.has(tag) ? "white" : "black"} 
              fontFamily={"mono"}
            >
              {tag}
            </Text>
            <Text 
              textStyle={"xs"} 
              color={selectedTags.has(tag) ? "white" : "gray.500"} 
              fontFamily={"mono"}
            >
              ({cnt})
            </Text>
          </Button>
        ))}
      </Stack>
      {paginatedPosts.map((post) => (
        <PostCard key={post.metadata.title} post={post} />
      ))}
      <Flex justifyContent={"center"} marginTop={"1em"}>
        <PaginationRoot
          page={currentPage}
          count={totalPosts}
          pageSize={postsPerPage}
          onPageChange={(e) => setCurrentPage(e.page)}
          variant={"solid"}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    </>
  );
}