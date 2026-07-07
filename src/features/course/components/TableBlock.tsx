import { parseInline } from "../utils/parserHelpers";

interface TableBlockProps {
  content: string[];
}

export default function TableBlock({ content }: TableBlockProps) {
  const rows = content.map(row => 
    row.split("|")
      .map(cell => cell.trim())
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
  );

  if (rows.length < 2) return null;

  const headers = rows[0];
  const dataRows = rows.slice(2);

  return (
    <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm">
      <table className="w-full text-sm text-left text-slate-700">
        <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200 text-[#3966bf] font-bold select-none">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {dataRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4 leading-relaxed">{parseInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
