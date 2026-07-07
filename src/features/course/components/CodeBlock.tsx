import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightCode } from "../utils/parserHelpers";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightCode(code, language);
  const lines = code.split("\n");

  // Determine a simulated file name based on the language
  const getSimulatedFileName = () => {
    const extMap: Record<string, string> = {
      javascript: "script.js",
      js: "script.js",
      typescript: "index.ts",
      ts: "index.ts",
      tsx: "App.tsx",
      jsx: "Component.jsx",
      html: "index.html",
      css: "styles.css",
      json: "package.json",
      markdown: "README.md",
      md: "README.md",
      bash: "setup.sh",
      sh: "setup.sh",
    };
    return extMap[language.toLowerCase()] || `code.${language || "txt"}`;
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl overflow-hidden my-6 shadow-2xl flex flex-col font-mono text-sm leading-relaxed">
      {/* VS Code Title / Tab Bar */}
      <div className="bg-[#252526] border-b border-[#1e1e1e] px-4 py-0 flex justify-between items-center select-none h-9">
        <div className="flex items-center h-full gap-2">
          {/* Window Control Buttons */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 hover:bg-[#ff5f56] transition-colors cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 hover:bg-[#ffbd2e] transition-colors cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 hover:bg-[#27c93f] transition-colors cursor-pointer"></span>
          </div>
          {/* Simulated File Tab */}
          <div className="bg-[#1e1e1e] text-[#d4d4d4] px-4 h-full flex items-center gap-2 border-t-2 border-t-[#007acc] text-xs font-sans rounded-t-sm border-r border-[#252526]">
            <span className="text-[#3fa4c6] font-semibold">⚡</span>
            <span>{getSimulatedFileName()}</span>
          </div>
        </div>

        {/* Copy Button & Language Badge */}
        <div className="flex items-center gap-3 pr-1">
          <span className="text-[10px] text-[#858585] tracking-wider uppercase font-sans font-bold bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-[#3e3e3f]">
            {language || "code"}
          </span>
          <button 
            onClick={handleCopy}
            title="Copy code"
            className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors text-xs font-sans border ${
              copied 
                ? "bg-[#254d30] text-[#a6e22e] border-[#3a6e45]" 
                : "bg-[#2d2d2d] hover:bg-[#3e3e3f] text-[#cccccc] hover:text-white border-[#3c3c3c]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Code body */}
      <div className="flex overflow-x-auto p-4 max-h-[500px] bg-[#1e1e1e] align-top">
        {/* Line Numbers */}
        <div className="flex flex-col text-[#858585] select-none text-right pr-4 border-r border-[#2d2d2d]/60 w-9 flex-shrink-0 font-mono text-xs leading-[22px] pt-0.5">
          {lines.map((_, idx) => (
            <span key={idx}>{idx + 1}</span>
          ))}
        </div>
        {/* Code content */}
        <pre 
          className="flex-1 bg-transparent p-0 border-0 rounded-none m-0 pl-4 text-[#d4d4d4] font-mono text-sm leading-[22px] overflow-x-visible whitespace-pre text-left"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
