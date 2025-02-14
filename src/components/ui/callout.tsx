import { Flex } from "@chakra-ui/react";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa6";

type Props = {
  type: "info" | "warn" | "danger" | "default";
  title: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    color: "#086ddd",
    bg: "#086ddd1a",
    icon: (
      <></>
    ),
  },
  warn: {
    color: "#ec7500",
    bg: "#ec75001a",
    icon: (
      <></>
    ),
  },
  danger: {
    color: "#e93147",
    bg: "#e931471a",
    icon: (
      <></>
    ),
  },
  default: {
    color: "#212124",
    bg: "#f2f3f6",
    icon: (
      <FaQuoteLeft />
    ),
  },
};

const Callout = ({ type = "default", title, children }: Props) => {
  return (
    <Flex
      as="blockquote"
      padding="1em 1.5em"
      borderRadius="0.7em"
      marginTop="1em"
      columnGap="1em"
      bg={calloutStyles[type].bg}
      color={calloutStyles[type].color}
    >
      <Flex marginTop="1em">
        {calloutStyles[type].icon}
      </Flex>
      <Flex>
        <span>
          {title && <span style={{ fontWeight: "bold" }}>{title}</span>}
          {children}
        </span>
      </Flex>
    </Flex>
  );
};

export default Callout;
