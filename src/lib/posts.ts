import fs from "fs";
import path from "path";
import { parse as yamlParse } from "yaml";
import { config } from "@/config";
import { Metadata, Post } from "@/types/post";

const postsDir = path.join(process.cwd(), config.paths.contents.root);

export function getPaginatedPosts(size: number, page: number): Post[] {
  const posts = getAllPosts();
  const start = (page - 1) * size;
  const end = start + size;
  return posts.slice(start, end);
}

export function getTotalPages(size: number) {
  const totalPosts = getAllPosts().length;
  return Math.ceil(totalPosts / size);
}

/**
 * Retrieves all posts by reading markdown files, parsing their content and
 * metadata, filtering out invalid posts, and sorting them.
 * @returns Array of `Post` sorted by lastmod date descending.
 */
export function getAllPosts(): Post[] {
  return getMarkdownFilePaths(postsDir)
    .map((abs) => parseMarkdownFile(abs))
    .filter((post) => !!post)
    .sort((a, b) => getSortValue(b) - getSortValue(a));
}

/**
 * Recursively retrieves all markdown (.md, .mdx) files and returns them in a 
 * flat array.
 */
function getMarkdownFilePaths(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getMarkdownFilePaths(fullPath) : fullPath;
    })
    .filter((filepath) => {
      return !config.paths.ignore.some((subdir) => filepath.includes(subdir));
    })
    .filter((filepath) => {
      const ext = path.extname(filepath).toLowerCase();
      return ext === ".md" || ext === ".mdx";
    });
}

/**
 * Parses raw content from a markdown file. Returns null for files with no 
 * frontmatter.
 */
function parseMarkdownFile(pathname: string): Post | null {
  const raw = fs.readFileSync(pathname, "utf-8");
  const pattern = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
  const match = pattern.exec(raw);
  const title = path.basename(pathname, path.extname(pathname));

  if (match) {
    return {
      metadata: parseFrontmatter(match[1], title),
      content: match[2],
    };
  }
  
  return null;
}

/**
 * Parses YAML string and generates slugs.
 */
function parseFrontmatter(frontmatter: string, title: string): Metadata {
  const metadata = yamlParse(frontmatter) as Metadata;
  metadata.title = title;
  metadata.slug = title.replace(/\s/g, "-").toLowerCase();
  return metadata;
}

function getSortValue(post: Post): number {
  return new Date(post.metadata.lastmod).getTime();
}
