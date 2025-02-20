"use client";

import { Button, Stack, Text } from "@chakra-ui/react";
import { Post } from "@/app/posts/utils/parse"
import PostCard from "@/app/posts/components/postcard";
import { useState } from "react";
import { colors } from "@/colors";

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
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

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
              if (selectedTags.has(tag)) {
                setSelectedTags((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(tag);
                  return newSet;
                })
              } else {
                setSelectedTags((prev) => {
                  const newSet = new Set(prev);
                  newSet.add(tag);
                  return newSet;
                })
              }
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
      {posts
      .filter((post) => {
        if (selectedTags.size === 0) return true;
        return post.metadata.tags?.some((tag) => (selectedTags.has(tag)))
      })
      .map((post) => (
        <PostCard key={post.metadata.title} post={post} />
      ))}
    </>
  );
}