import { MotionDiv } from "@/components/motion";
import { Header } from "@/components/header";
import { getPaginatedPosts, getTotalPages } from "@/lib/posts";
import Link from "next/link";
import { Suspense } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

interface Params {
  page: string;
}

const POSTS_PER_PAGE = 20;

export function generateStaticParams() {
  return Array.from({ length: getTotalPages(POSTS_PER_PAGE) }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const page = (await params).page;
  const posts = getPaginatedPosts(POSTS_PER_PAGE, Number(page));

  return (
    <Box>
      <Header />
      <Box maxWidth={"48rem"} margin={"auto"} p={"1rem"}>
        <MotionDiv>
          <Suspense>
            <Stack gap={1}>
              {posts.map((post, i) => (
                <Link href={`/posts/${post.metadata.slug}`} key={i}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Text textStyle={"md"} fontWeight={600}>
                      {post.metadata.title} 
                    </Text>
                    <Text textStyle={"sm"} fontFamily={"mono"}>
                      {post.metadata.lastmod}
                    </Text>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Suspense>
        </MotionDiv>
        <Stack direction="row" justifyContent="space-between" my={"2rem"}>
          {Number(page) > 1 ? (
            <Link href={(Number(page) - 1).toString()}>이전</Link>
          ) : <Box />}
          {Number(page) < getTotalPages(POSTS_PER_PAGE) ? (
            <Link href={(Number(page) + 1).toString()}>다음</Link>
          ) : <Box />}
        </Stack>
      </Box>
    </Box>
  );
}
