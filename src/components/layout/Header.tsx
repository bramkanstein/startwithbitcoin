"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-mono text-xl font-bold">
      <span className="text-accent">&lt;</span>
      <span>₿</span>
      <span className="text-accent">/&gt;</span>
    </Link>
  );
}

function MobileMenuButton({
  isOpen,
  onClick
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOpen ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </>
        ) : (
          <>
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </>
        )}
      </svg>
    </button>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE_CONFIG.github.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            href="/request"
            className="bg-accent px-4 py-2 text-sm font-medium text-black shadow-[0_0_15px_rgba(255,153,0,0.2)] transition-all hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(255,153,0,0.3)]"
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton
          isOpen={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-base font-medium text-muted transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-3 border-border" />
            <a
              href={SITE_CONFIG.github.website}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-base font-medium text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              href="/request"
              className="mt-2 bg-accent px-4 py-3 text-center text-base font-medium text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Early Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
