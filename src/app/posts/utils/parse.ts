import fs from "fs"
import path from "path"
import { parse as yamlParse } from "yaml";

type Metadata = {
  title: string;
  date: string;
  lastmod: string;
  slug: string;
  tags?: string[];
};

export type Post = {
  metadata: Metadata;
  content: string;
};

function parseFrontmatter(raw: string) {
  const pattern = /---\s*([\s\S]*?)\s*---/;
  const frontmatter = pattern.exec(raw)![1];
  
  const metadata = yamlParse(frontmatter) as Metadata;
  const content = raw.replace(pattern, "").trim();

  return {
    metadata: metadata,
    content: content,
  };
}

function parseMDXFile(path: string) {
  const rawContent = fs.readFileSync(path, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getMDXFiles(fullPath) : fullPath;
    })
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.md' || ext === '.mdx';
    });
}

function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = parseMDXFile(file);
    metadata.title = path.basename(file, path.extname(file));
    return { metadata, content };
  });
}

export function getAllPosts(): Post[] {
  return getMDXData(path.join(process.cwd(), process.env.CONTENTS_DIRECTORY || ""));
}
