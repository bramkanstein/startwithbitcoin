"use client";

import { useState, ReactNode } from "react";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: ReactNode;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  language,
  filename,
  children,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const code = typeof children === "string" ? children : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="group relative overflow-hidden border border-border">
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border bg-terminal-header px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="relative overflow-x-auto bg-code-bg">
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded bg-border px-2 py-1 font-mono text-xs text-muted opacity-0 transition-opacity hover:bg-muted hover:text-background group-hover:opacity-100"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
        <pre className="p-4">
          <code className="font-mono text-sm">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 inline-block w-8 select-none text-right text-muted">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              children
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="rounded bg-code-bg px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  );
}
