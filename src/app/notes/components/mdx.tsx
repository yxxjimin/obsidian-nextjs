import {
  Box, 
  Heading, 
  Image, 
  Link, 
  Text 
} from "@chakra-ui/react";
import React from 'react';
import { Blockquote } from "@/components/ui/blockquote";

const components = {
  h1: (props: any) => <Heading as="h1" size="3xl" fontWeight={700} {...props} />,

  h2: (props: any) => <Heading as="h2" size="2xl" fontWeight={700} marginTop="1em" marginBottom="1em" {...props} />,

  h3: (props: any) => <Heading as="h3" size="xl" fontWeight={700} marginTop="1em" marginBottom="1em" {...props} />,

  p: (props: any) => {
    // Prevent wrapping <div> or images with <p>
    const { children } = props;
    const childArray = React.Children.toArray(children);
    if (
      childArray.length === 1 &&
      React.isValidElement(childArray[0])
    ) {
      return childArray[0];
    }
    return <Text fontSize={16} my="16px" lineHeight="1.7" {...props} />;
  },

  ul: (props: any) => (
    <ul
      style={{
        marginLeft: "1.5em",
        marginTop: "1em",
        marginBottom: "1em",
        listStyleType: "disc",
      }}
      {...props}
    />
  ),

  ol: (props: any) => (
    <ol
      style={{
        marginLeft: "1.5em",
        marginTop: "1em",
        marginBottom: "1em",
      }}
      {...props}
    />
  ),

  li: ({ node, children, ...props }: any) => (
    <li style={{ marginBottom: "1em" }} {...props}>
      {children}
    </li>
  ),

  a: (props: any) => <Link color="blue.500" fontWeight={600} {...props} />,

  img: (props: any) => {
    let imageUrl = props.src;
    if (props.src.startsWith(".")) {
      const regex = /.*?(_static\/.+)/;
      const match = props.src.match(regex);
      imageUrl = `/api/mdx-image?path=${encodeURIComponent(match[1])}`;
    }
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        margin="25px 0px" 
        maxWidth="800px" 
        alignItems="center"
      >
        <Image
          {...props}
          borderRadius={"lg"}
          src={imageUrl}
        />
        <Text
          as="figcaption"
          fontSize="14px"
          textAlign="center"
          marginTop="16px"
          color="gray.500"
        >
          {props.alt}
        </Text>
      </Box>
    );
  },

  blockquote: (props: any) => (
    <Blockquote {...props} />
  ),
};

export default components;
