import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from "@/app/notes/components/mdx";

export default function MarkdownRenderer({ content }: { content: string | undefined }) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeRaw]} 
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}