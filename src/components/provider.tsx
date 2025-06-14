import { MDXRemote } from "next-mdx-remote/rsc";
import components from "@/components/mdx";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import wikiLinkPlugin from "remark-wiki-link";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default async function MDXProvider({ content }: { content: string | undefined }) {
  return (
    <MDXRemote 
      source={content || "No source"}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            [
              wikiLinkPlugin, 
              { 
                hrefTemplate: (permalink: string) => `/posts/${permalink}`,
                pageResolver: (name: string) => [name.replace(/\s/g, '-').toLowerCase()],
                aliasDivider: '|',
              }
            ],
            remarkMath,
          ],
          rehypePlugins: [
            [
              rehypeShiki, 
              { 
                themes: {
                  light: "github-light",
                  dark: "github-dark",
                },
                skipLanguages: [],
              }
            ],
            rehypeKatex,
          ],
        },
      }}
      components={components}
    />
  );
}
