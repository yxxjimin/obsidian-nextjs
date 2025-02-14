import { MDXRemote } from "next-mdx-remote/rsc";
import components from "@/app/notes/components/mdx";

/** @deprecated Figure out some way to render GFM */
export default async function MDXProvider({ source }: any) {
  return (
    <MDXRemote
      source={source}
      components={components}
    />
  );
}
