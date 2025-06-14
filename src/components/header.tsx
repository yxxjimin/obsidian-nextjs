import { config } from "@/config";
import { Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <Stack 
      direction={"row"} 
      justifyContent={"space-between"}
      width={"100%"}
      maxWidth={"48rem"}
      margin={"auto"}
      p={"1rem"}
    >
      <Link href={"/"}>
        <Text 
          textStyle={"xl"} 
          fontWeight={"700"} 
          fontFamily={"mono"}
        >
          {config.siteMetadata.title}
        </Text>
      </Link>
      <Stack direction={"row"} gap={"1rem"}>
        {[
          { title: "posts", href: "/page" },
          { title: "about", href: "/about" },
        ].map((item, i) => (
          <Link key={i} href={item.href}>
            <Text 
              textStyle={"xl"} 
              fontWeight={"600"} 
              fontFamily={"mono"}
            >
              {item.title}
            </Text>
        </Link>
        ))}
      </Stack>
    </Stack>
  );
}
