export interface Metadata {
  title: string;
  lastmod: string;
  slug: string;
  tags?: string[];
}

export interface Post {
  metadata: Metadata;
  content: string;
}
