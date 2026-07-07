import CodeBlock from "@features/course/components/CodeBlock";
import BlockquoteBlock from "@features/course/components/BlockquoteBlock";
import TableBlock from "@features/course/components/TableBlock";
import ListBlock from "@features/course/components/ListBlock";
import { slugify, parseInline } from "./parserHelpers";

export function parseMarkdownToBlocks(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const blocks: any[] = [];
  let currentBlockType: string | null = null;
  let currentBlockContent: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith("```")) {
      if (currentBlockType === "code") {
        blocks.push({
          type: "code",
          language: currentBlockContent[0],
          content: currentBlockContent.slice(1).join("\n")
        });
        currentBlockType = null;
        currentBlockContent = [];
      } else {
        if (currentBlockType) {
          blocks.push({ type: currentBlockType, content: currentBlockContent });
        }
        currentBlockType = "code";
        const lang = line.slice(3).trim() || "text";
        currentBlockContent = [lang];
      }
      continue;
    }

    if (currentBlockType === "code") {
      currentBlockContent.push(line);
      continue;
    }

    // Handle blockquotes/callouts
    if (line.startsWith(">")) {
      if (currentBlockType !== "blockquote") {
        if (currentBlockType) {
          blocks.push({ type: currentBlockType, content: currentBlockContent });
        }
        currentBlockType = "blockquote";
        currentBlockContent = [];
      }
      const quoteLine = line.slice(1).startsWith(" ") ? line.slice(2) : line.slice(1);
      currentBlockContent.push(quoteLine);
      continue;
    }

    // Handle tables
    if (line.startsWith("|")) {
      if (currentBlockType !== "table") {
        if (currentBlockType) {
          blocks.push({ type: currentBlockType, content: currentBlockContent });
        }
        currentBlockType = "table";
        currentBlockContent = [];
      }
      currentBlockContent.push(line);
      continue;
    }

    // Handle horizontal rules
    if (line.trim() === "---") {
      if (currentBlockType) {
        blocks.push({ type: currentBlockType, content: currentBlockContent });
        currentBlockType = null;
        currentBlockContent = [];
      }
      blocks.push({ type: "hr" });
      continue;
    }

    // Handle headers
    if (line.startsWith("#")) {
      if (currentBlockType) {
        blocks.push({ type: currentBlockType, content: currentBlockContent });
        currentBlockType = null;
        currentBlockContent = [];
      }
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        blocks.push({
          type: "header",
          level: match[1].length,
          text: match[2]
        });
      }
      continue;
    }

    // Handle list items
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      if (currentBlockType !== "list") {
        if (currentBlockType) {
          blocks.push({ type: currentBlockType, content: currentBlockContent });
        }
        currentBlockType = "list";
        currentBlockContent = [];
      }
      currentBlockContent.push({
        indent: listMatch[1].length,
        marker: listMatch[2],
        text: listMatch[3]
      });
      continue;
    }

    // Empty line separates blocks
    if (line.trim() === "") {
      if (currentBlockType) {
        blocks.push({ type: currentBlockType, content: currentBlockContent });
        currentBlockType = null;
        currentBlockContent = [];
      }
      continue;
    }

    // Paragraph accumulation
    if (currentBlockType !== "paragraph") {
      if (currentBlockType) {
        blocks.push({ type: currentBlockType, content: currentBlockContent });
      }
      currentBlockType = "paragraph";
      currentBlockContent = [];
    }
    currentBlockContent.push(line);
  }

  if (currentBlockType) {
    blocks.push({ type: currentBlockType, content: currentBlockContent });
  }

  return blocks;
}

export function renderMarkdown(markdown: string) {
  if (!markdown) return null;
  const blocks = parseMarkdownToBlocks(markdown);

  return blocks.map((block, idx) => {
    switch (block.type) {
      case "hr":
        return <hr key={idx} className="border-slate-200 my-8" />;
      case "header": {
        if (block.level === 1) return null;
        const id = slugify(block.text);
        const headerClasses = 
          block.level === 2 ? "text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2" :
          block.level === 3 ? "text-lg md:text-xl font-bold text-slate-700 mt-6 mb-3 flex items-center gap-2" :
          "text-base md:text-lg font-semibold text-slate-600 mt-4 mb-2";

        const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;

        return (
          <Tag key={idx} id={id} className={`${headerClasses} scroll-mt-24`}>
            {parseInline(block.text)}
          </Tag>
        );
      }
      case "code":
        return <CodeBlock key={idx} code={block.content} language={block.language} />;
      case "blockquote":
        return <BlockquoteBlock key={idx} content={block.content} />;
      case "table":
        return <TableBlock key={idx} content={block.content} />;
      case "list":
        return <ListBlock key={idx} content={block.content} />;
      case "paragraph": {
        const text = block.content.join("\n");
        // Check for ASCII / boxes
        if (text.startsWith("┌") || text.startsWith("│") || text.includes("┼") || text.includes("├")) {
          return (
            <pre key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 p-4 rounded-xl font-mono text-xs md:text-sm overflow-x-auto leading-relaxed my-4">
              {text}
            </pre>
          );
        }
        
        const imgMatch = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
          return (
            <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white flex flex-col items-center">
              <img src={imgMatch[2]} alt={imgMatch[1]} className="max-w-full h-auto object-cover" />
              {imgMatch[1] && (
                <span className="text-xs text-slate-500 py-2 font-medium tracking-wide uppercase border-t border-slate-200 w-full text-center bg-slate-50 select-none">
                  {imgMatch[1]}
                </span>
              )}
            </div>
          );
        }
        return (
          <p key={idx} className="leading-relaxed text-slate-700 my-4 text-sm md:text-base">
            {parseInline(text)}
          </p>
        );
      }
      default:
        return null;
    }
  });
}

export function extractTOC(markdown: string) {
  const blocks = parseMarkdownToBlocks(markdown);
  return blocks
    .filter(b => b.type === "header" && b.level > 1 && b.level < 4)
    .map(b => ({
      level: b.level,
      text: b.text.replace(/^[0-9.]+\s+/, "").replace(/^[^\w\s]*\s*/, ""),
      anchor: slugify(b.text)
    }));
}
