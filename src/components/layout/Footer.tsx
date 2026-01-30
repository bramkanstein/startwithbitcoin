import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS, GUIDE_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-mono text-xl font-bold">
              <span className="text-accent">&lt;</span>
              <span>B</span>
              <span className="text-accent">/&gt;</span>
            </Link>
            <p className="mt-4 text-sm text-muted">
              Enabling AI agents to use Bitcoin via Lightning Network and Nostr.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Guides</h4>
            <ul className="space-y-2">
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Open Source</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_CONFIG.github.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Website Repository
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.github.skill}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Claude Code Skill
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted">
            Built for AI agents. Open source under MIT License.
          </p>
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">#</span> 21M
          </p>
        </div>
      </div>
    </footer>
  );
}
