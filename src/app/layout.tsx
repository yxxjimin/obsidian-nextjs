import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Box, Flex } from "@chakra-ui/react";
import { colors } from "@/colors";
import { ColorModeButton } from "@/components/ui/color-mode";
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: "://yxxjimin",
};

const font = localFont({ src: '../static/PretendardVariable.woff2' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={font.className} suppressHydrationWarning>
      <body>
        <Provider>
          <Flex
            as={"div"}
            direction={"column"}
            bgColor={colors.background}
            width={"100%"}
            minHeight={"100vh"}
          >
            {children}
            <Box position={"fixed"} bottom={10} right={10}>
              <ColorModeButton />
            </Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
