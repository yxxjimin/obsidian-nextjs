import { MDXRemote } from "next-mdx-remote/rsc";
import components from "@/app/posts/components/mdx";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import wikiLinkPlugin from "remark-wiki-link";

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
          ],
        },
      }}
      components={components}
    />
  );
}
