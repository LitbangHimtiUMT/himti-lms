import { parseInline } from "../utils/parserHelpers";

interface BlockquoteBlockProps {
  content: string[];
}

export default function BlockquoteBlock({ content }: BlockquoteBlockProps) {
  const text = content.join("\n").trim();
  
  let type = "note";
  let title = "Catatan Dosen";
  let displayBody = text;

  if (text.toLowerCase().includes("peringatan dosen:") || text.toLowerCase().includes("peringatan:") || text.toLowerCase().includes("security alert!")) {
    type = "warning";
    title = "Peringatan Dosen";
    displayBody = text.replace(/^(.*?)(peringatan dosen:|peringatan:|security alert!)\s*/i, "");
  } else if (text.toLowerCase().includes("tips dosen:") || text.toLowerCase().includes("tips:")) {
    type = "tip";
    title = "Tips Dosen";
    displayBody = text.replace(/^(.*?)(tips dosen:|tips:)\s*/i, "");
  } else if (text.toLowerCase().includes("catatan penting dari dosen:") || text.toLowerCase().includes("catatan penting:")) {
    type = "important";
    title = "Catatan Penting";
    displayBody = text.replace(/^(.*?)(catatan penting dari dosen:|catatan penting:)\s*/i, "");
  } else if (text.toLowerCase().includes("catatan dosen:") || text.toLowerCase().includes("catatan:")) {
    type = "note";
    title = "Catatan Dosen";
    displayBody = text.replace(/^(.*?)(catatan dosen:|catatan:)\s*/i, "");
  }

  let cardClass = "bg-slate-50 border border-slate-200 border-l-4 border-l-[#3966bf] text-slate-700";
  let iconColor = "text-[#3966bf]";
  let icon = (
    <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  let titleColor = "text-[#3966bf]";

  if (type === "warning") {
    cardClass = "bg-rose-50 border border-rose-100 border-l-4 border-l-rose-500 text-rose-800";
    iconColor = "text-rose-500";
    titleColor = "text-rose-600";
    icon = (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else if (type === "tip") {
    cardClass = "bg-emerald-50 border border-emerald-100 border-l-4 border-l-emerald-500 text-emerald-800";
    iconColor = "text-emerald-500";
    titleColor = "text-emerald-600";
    icon = (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  } else if (type === "important") {
    cardClass = "bg-amber-50 border border-amber-100 border-l-4 border-l-amber-500 text-amber-800";
    iconColor = "text-amber-550";
    titleColor = "text-amber-600";
    icon = (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <div className={`p-4 rounded-r-2xl my-5 border-y border-r border-slate-250 flex gap-3 shadow-sm ${cardClass}`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <span className={`block text-xs font-extrabold ${titleColor} uppercase tracking-wider mb-1 opacity-1`}>{title}</span>
        <p className="text-sm leading-relaxed">{parseInline(displayBody)}</p>
      </div>
    </div>
  );
}
