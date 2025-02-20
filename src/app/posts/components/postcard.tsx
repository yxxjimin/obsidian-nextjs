import { Card, Flex, Stack, Text } from "@chakra-ui/react";
import { Post } from "@/app/posts/utils/parse";
import Capsule from "@/app/posts/components/capsule";
import { colors } from "@/colors";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Card.Root bgColor={colors.background} borderColor={colors.border} width={"100%"}>
        <Link href={`/posts/${post.metadata.slug}`}>
        <Card.Body>
          <Card.Title>{post.metadata.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Flex direction={"column"}>
            <Stack direction={"row"} marginY={"1em"}>
              {post?.metadata.tags?.map((tag) => (
                <Capsule key={tag} text={tag} />
              ))}
            </Stack>
            <Text textStyle={"sm"} color={"gray.400"}>
              {post.metadata.date}
            </Text>
          </Flex>
        </Card.Footer>
    </Link>
      </Card.Root>
  );
}
