import React from "react";

// ============================================
// SYNTAX HIGHLIGHTING ENGINE
// ============================================
export function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightCode(code: string, lang: string) {
  if (!code) return "";
  let escaped = escapeHtml(code);
  const normalizedLang = lang ? lang.toLowerCase() : "";
  
  if (
    normalizedLang === "javascript" || 
    normalizedLang === "js" || 
    normalizedLang === "typescript" || 
    normalizedLang === "ts" || 
    normalizedLang === "tsx" || 
    normalizedLang === "jsx"
  ) {
    // Multiline comments: /* ... */
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-[#6a9955] italic">$1</span>');
    // Single line comments: // ...
    escaped = escaped.replace(/(\/\/.*)/g, '<span class="text-[#6a9955] italic">$1</span>');
    // Strings: "..." or '...' or `...`
    escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="text-[#ce9178]">$1$2$1</span>');
    
    // Declaration Keywords (blue)
    const decKeywords = /\b(const|let|var|function|class|interface|type|new|extends|implements|import|export|from|as|default|public|private|protected|readonly|static|get|set)\b/g;
    escaped = escaped.replace(decKeywords, '<span class="text-[#569cd6] font-semibold">$1</span>');
    
    // Control/Flow Keywords (purple/pink)
    const ctrlKeywords = /\b(return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|async|await|in|of|typeof|instanceof|void|delete)\b/g;
    escaped = escaped.replace(ctrlKeywords, '<span class="text-[#c586c0] font-semibold">$1</span>');
    
    // Built-ins & DOM API (light blue / teal)
    const builtins = /\b(console|log|error|warn|document|window|localStorage|JSON|Map|Set|Promise|Error|Object|Array|String|Number|Boolean|Function|Date|Math|RegExp)\b/g;
    escaped = escaped.replace(builtins, '<span class="text-[#4fc1ff]">$1</span>');

    // React Hooks & Constants (teal/green)
    const reactHooks = /\b(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|useImperativeHandle|useLayoutEffect|useDebugValue)\b/g;
    escaped = escaped.replace(reactHooks, '<span class="text-[#4ec9b0] font-medium">$1</span>');

    // Function Calls (yellow)
    escaped = escaped.replace(/\b(\w+)(?=\()/g, '<span class="text-[#dcdcaa]">$1</span>');

    // Numbers (light green)
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>');
  } else if (normalizedLang === "html") {
    // Comments
    escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-[#6a9955] italic">$1</span>');
    // Attribute values (strings)
    escaped = escaped.replace(/(=)(["'])(.*?)\2/g, '$1<span class="text-[#ce9178]">$2$3$2</span>');
    // HTML tags (blue)
    escaped = escaped.replace(/(&lt;\/?[a-zA-Z0-9:-]+)/g, '<span class="text-[#569cd6] font-semibold">$1</span>');
    escaped = escaped.replace(/(\/?&gt;)/g, '<span class="text-[#569cd6] font-semibold">$1</span>');
    // Attributes (light blue)
    escaped = escaped.replace(/\s([a-zA-Z0-9-]+)=/g, ' <span class="text-[#9cdcfe]">$1</span>=');
  } else if (normalizedLang === "css") {
    // Comments
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-[#6a9955] italic">$1</span>');
    // Selectors (yellow-orange)
    escaped = escaped.replace(/([a-zA-Z0-9.-_#\s]+)(?=\s*\{)/g, '<span class="text-[#dcdcaa] font-semibold">$1</span>');
    // Properties (light blue)
    escaped = escaped.replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span class="text-[#9cdcfe]">$1</span>');
    // Values (orange-brown or green for numbers)
    escaped = escaped.replace(/(:\s*)([^;]+)/g, '$1<span class="text-[#ce9178]">$2</span>');
  }
  return escaped;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[-\s]+/g, "-");
}

export function parseInline(text: string): React.ReactNode[] {
  let tokens: { type: string; val: string; href?: string }[] = [{ type: "text", val: text }];

  // 1. Code Spans: `code`
  let nextTokens: any[] = [];
  for (const token of tokens) {
    if (token.type !== "text") {
      nextTokens.push(token);
      continue;
    }
    const parts = token.val.split(/`([^`]+)`/g);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        nextTokens.push({ type: "code", val: parts[i] });
      } else if (parts[i]) {
        nextTokens.push({ type: "text", val: parts[i] });
      }
    }
  }
  tokens = nextTokens;

  // 2. Bold: **text**
  nextTokens = [];
  for (const token of tokens) {
    if (token.type !== "text") {
      nextTokens.push(token);
      continue;
    }
    const parts = token.val.split(/\*\*([^*]+)\*\*/g);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        nextTokens.push({ type: "bold", val: parts[i] });
      } else if (parts[i]) {
        nextTokens.push({ type: "text", val: parts[i] });
      }
    }
  }
  tokens = nextTokens;

  // 3. Italic: *text*
  nextTokens = [];
  for (const token of tokens) {
    if (token.type !== "text") {
      nextTokens.push(token);
      continue;
    }
    const parts = token.val.split(/\*([^*]+)\*/g);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        nextTokens.push({ type: "italic", val: parts[i] });
      } else if (parts[i]) {
        nextTokens.push({ type: "text", val: parts[i] });
      }
    }
  }
  tokens = nextTokens;

  // 4. Links: [text](url)
  nextTokens = [];
  for (const token of tokens) {
    if (token.type !== "text") {
      nextTokens.push(token);
      continue;
    }
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    let lastIndex = 0;
    while ((match = regex.exec(token.val)) !== null) {
      const before = token.val.substring(lastIndex, match.index);
      if (before) nextTokens.push({ type: "text", val: before });
      nextTokens.push({ type: "link", val: match[1], href: match[2] });
      lastIndex = regex.lastIndex;
    }
    const after = token.val.substring(lastIndex);
    if (after) nextTokens.push({ type: "text", val: after });
  }
  tokens = nextTokens.length > 0 ? nextTokens : tokens;

  return tokens.map((token, idx) => {
    switch (token.type) {
      case "code":
        return <code key={idx} className="bg-slate-100 border border-slate-200 text-[#3966bf] px-1.5 py-0.5 rounded font-mono text-xs md:text-sm">{token.val}</code>;
      case "bold":
        return <strong key={idx} className="font-bold text-slate-900">{token.val}</strong>;
      case "italic":
        return <em key={idx} className="italic text-slate-850">{token.val}</em>;
      case "link":
        return (
          <a key={idx} href={token.href} className="text-[#3966bf] hover:text-[#3966bf]/80 font-bold underline decoration-[#fda802]/50 hover:decoration-[#3966bf] transition-all" target="_blank" rel="noopener noreferrer">
            {token.val}
          </a>
        );
      default:
        return token.val;
    }
  });
}
