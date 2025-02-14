import { MDXRemote } from "next-mdx-remote/rsc";
import components from "@/app/posts/components/mdx";
import remarkGfm from "remark-gfm";
import highlight from "remark-sugar-high";

export default async function MDXProvider({ content }: { content: string | undefined }) {
  return (
    <MDXRemote 
      source={content || "No source"}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            highlight,
          ],
        },
      }}
      components={components}
    />
  );
}
