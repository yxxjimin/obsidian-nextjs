import {
  Box, 
  Em, 
  Heading, 
  Image, 
  Span, 
  Text 
} from "@chakra-ui/react";
import React, { ComponentProps, JSX } from 'react';
import Callout from "@/components/ui/callout";
import NextLink from "next/link";

const components = {
  h1: (props: JSX.IntrinsicElements["h1"]) => (
    <Heading 
      as="h1" 
      size="3xl" 
      fontWeight={700} 
      {...props} 
    />
  ),

  h2: (props: JSX.IntrinsicElements["h2"]) => (
    <Heading 
      as="h2" 
      size="2xl" 
      fontWeight={700} 
      marginTop="1em" 
      marginBottom="1em" 
      {...props} 
    />
  ),

  h3: (props: JSX.IntrinsicElements["h3"]) => (
    <Heading 
      as="h3"
      size="xl" 
      fontWeight={700} 
      marginTop="1em" 
      marginBottom="1em" 
      {...props} 
    />
  ),

  p: (props: JSX.IntrinsicElements["p"]) => {
    // Prevent wrapping <div> or images with <p>
    const { children } = props;
    const childArray = React.Children.toArray(children);
    if (
      childArray.length === 1 &&
      React.isValidElement(childArray[0])
    ) {
      return childArray[0];
    }
    return (
      <Text 
        fontSize={16} 
        my="1em" 
        lineHeight="1.7" 
        {...props} 
      />
    );
  },

  em: (props: JSX.IntrinsicElements["em"]) => (
    <Em {...props} />
  ),

  ul: (props: JSX.IntrinsicElements["ul"]) => (
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

  ol: (props: JSX.IntrinsicElements["ol"]) => (
    <ol
      style={{
        marginLeft: "1.5em",
        marginTop: "1em",
        marginBottom: "1em",
        listStyleType: "decimal",
      }}
      {...props}
    />
  ),

  li: ({ children, ...props }: JSX.IntrinsicElements["li"]) => (
    <li style={{ marginBottom: "1em" }} {...props}>
      {children}
    </li>
  ),

  a: (props: ComponentProps<typeof NextLink>) => (
    // props of type `JSX.IntrinsicElements["li"]` will break the link
    <Span color="blue.500" fontWeight={600}>
      <NextLink {...props} />
    </Span>
  ),

  img: (props: JSX.IntrinsicElements["img"]) => {
    let imageUrl = props.src;
    if (props.src?.startsWith(".")) {
      const regex = /.*?(_static\/.+)/;
      const match = props.src.match(regex) || [];
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
          borderRadius={"lg"}
          src={imageUrl}
          alt={props.alt}
          maxHeight={300}
        />
        <Text
          as="figcaption"
          fontSize="0.8em"
          textAlign="center"
          marginTop="1em"
          color="gray.500"
        >
          {props.alt}
        </Text>
      </Box>
    );
  },

  blockquote: (props: JSX.IntrinsicElements["blockquote"]) => (
    // TODO: max-width not working
    <Callout type="default" title="">{props.children}</Callout>
  ),
};

export default components;
