import { parseInline } from "../utils/parserHelpers";

interface ListBlockProps {
  content: { indent: number; marker: string; text: string }[];
}

export default function ListBlock({ content }: ListBlockProps) {
  const isOrdered = /^\d/.test(content[0].marker);

  const listItems = content.map((item, idx) => {
    const listPadding = item.indent > 0 ? { paddingLeft: `${item.indent * 12}px` } : {};
    return (
      <li key={idx} style={listPadding} className="flex gap-2 items-start my-1 text-slate-700 leading-relaxed text-sm md:text-base">
        {isOrdered ? (
          <span className="text-[#3966bf] font-semibold select-none mt-0.5">{item.marker}</span>
        ) : (
          <span className="text-[#3966bf] select-none font-bold mt-2.5 block w-1.5 h-1.5 rounded-full bg-[#3966bf] flex-shrink-0"></span>
        )}
        <span className="flex-1">{parseInline(item.text)}</span>
      </li>
    );
  });

  return isOrdered ? (
    <ol className="my-4 space-y-1 list-none pl-0">{listItems}</ol>
  ) : (
    <ul className="my-4 space-y-1 list-none pl-0">{listItems}</ul>
  );
}
