import { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-code-bg text-foreground",
  accent: "bg-accent-light text-accent-dark",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  muted: "bg-card text-muted border border-border",
};

export function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
