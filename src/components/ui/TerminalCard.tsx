import { ReactNode } from "react";

interface TerminalCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function TerminalCard({ label, children, className = "" }: TerminalCardProps) {
  return (
    <div className={`overflow-hidden border border-border ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-terminal-header px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="ml-2 font-mono text-xs text-zinc-400">
          SYS: {label.toUpperCase()}
        </span>
      </div>
      {/* Terminal Body */}
      <div className="bg-terminal-body p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
}

interface TerminalLineProps {
  prompt?: string;
  children: ReactNode;
}

export function TerminalLine({ prompt = "$", children }: TerminalLineProps) {
  return (
    <div className="flex gap-2">
      <span className="text-accent">{prompt}</span>
      <span>{children}</span>
    </div>
  );
}

interface TerminalOutputProps {
  children: ReactNode;
}

export function TerminalOutput({ children }: TerminalOutputProps) {
  return <div className="text-muted">{children}</div>;
}
