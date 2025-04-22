import {
  Blockquote,
  Box, 
  Em, 
  Heading, 
  Image, 
  Separator, 
  Span, 
  Table, 
  Text 
} from "@chakra-ui/react";
import React, { ComponentProps, JSX } from 'react';
import Callout from "@/components/ui/callout";
import NextLink from "next/link";
import config from "@/config";

const components = {
  h1: (props: JSX.IntrinsicElements["h1"]) => (
    <Heading 
      as="h1" 
      fontSize={"2rem"}
      fontWeight={700} 
      {...props} 
    />
  ),

  h2: (props: JSX.IntrinsicElements["h2"]) => (
    <>
      <Heading 
        as="h2" 
        fontSize={"1.5rem"}
        fontWeight={700} 
        marginTop="2rem" 
        marginBottom="0.25rem" 
        {...props} 
      />
      <Separator 
        marginBottom={"1rem"} 
        borderColor={"black"} 
        _dark={{borderColor: "white"}}
      />
    </>
  ),

  h3: (props: JSX.IntrinsicElements["h3"]) => (
    <Heading 
      as="h3"
      fontSize={"1.25rem"} 
      fontWeight={700} 
      marginTop="2rem" 
      marginBottom="1rem" 
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
        fontSize={"1rem"} 
        my="1rem" 
        lineHeight="1.75"
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
    <Span color="black" fontWeight={600} textDecoration={"underline"}>
      <NextLink {...props} />
    </Span>
  ),

  img: (props: JSX.IntrinsicElements["img"]) => {
    let imageUrl = props.src;
    if (typeof props.src === "string" && props.src?.startsWith(".")) {
      const regex = new RegExp(`.*?(${config.paths.contents.static}\/.+)`);
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
          maxHeight={400}
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
    <Blockquote.Root variant="solid" marginY={"1rem"}>
      <Blockquote.Content {...props} marginY={"-1rem"}/>
    </Blockquote.Root>
  ),

  table: (props: JSX.IntrinsicElements["table"]) => (
    <Table.Root my="2rem" {...props} interactive />
  ),
  
  thead: (props: JSX.IntrinsicElements["thead"]) => (
    <Table.Header {...props} />
  ),
  
  tbody: (props: JSX.IntrinsicElements["tbody"]) => (
    <Table.Body {...props} />
  ),
  
  tr: (props: JSX.IntrinsicElements["tr"]) => (
    <Table.Row {...props} />
  ),
  
  th: (props: JSX.IntrinsicElements["th"]) => (
    <Table.ColumnHeader fontWeight={600} {...props} />
  ),
  
  td: (props: JSX.IntrinsicElements["td"]) => (
    <Table.Cell {...props} />
  ),

  Callout,
};

export default components;
