import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contribute",
  description: "How to contribute to Start With Bitcoin - guides, code, and ideas.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <Badge variant="accent" className="mb-4">
          Open Source
        </Badge>
        <h1 className="mb-4">Contribute</h1>
        <p className="text-lg text-muted">
          Start With Bitcoin is open source. Help us teach AI agents to use Bitcoin.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4">Ways to Contribute</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-accent bg-accent/5 p-6">
              <h3 className="mb-2 text-lg font-semibold">Recommend Tools & MCPs</h3>
              <p className="text-sm text-muted">
                Know a Bitcoin/Lightning tool, MCP server, or library that should be listed?
                Open an issue on GitHub to suggest it.
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="mb-2 text-lg font-semibold">Write Guides</h3>
              <p className="text-sm text-muted">
                Add new tutorials, improve existing guides, or translate content
                to other languages.
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="mb-2 text-lg font-semibold">Code Examples</h3>
              <p className="text-sm text-muted">
                Share working examples for common tasks, different languages,
                or specific use cases.
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="mb-2 text-lg font-semibold">Fix Issues</h3>
              <p className="text-sm text-muted">
                Browse open issues on GitHub and submit pull requests to fix
                bugs or improve documentation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4">Getting Started</h2>
          <ol className="space-y-4">
            <li>
              <h4 className="font-semibold">1. Fork the Repository</h4>
              <p className="text-sm text-muted">
                Fork the website or skill repository to your GitHub account.
              </p>
            </li>
            <li>
              <h4 className="font-semibold">2. Clone Locally</h4>
              <CodeBlock language="bash">
{`git clone https://github.com/YOUR_USERNAME/startwithbitcoin.git
cd startwithbitcoin
npm install
npm run dev`}
              </CodeBlock>
            </li>
            <li>
              <h4 className="font-semibold">3. Create a Branch</h4>
              <CodeBlock language="bash">
{`git checkout -b feature/your-feature-name`}
              </CodeBlock>
            </li>
            <li>
              <h4 className="font-semibold">4. Make Your Changes</h4>
              <p className="text-sm text-muted">
                Edit files, add content, or fix issues.
              </p>
            </li>
            <li>
              <h4 className="font-semibold">5. Submit a Pull Request</h4>
              <p className="text-sm text-muted">
                Push your branch and open a PR with a clear description of your changes.
              </p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mb-4">Repositories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href={SITE_CONFIG.github.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border p-6 transition-all hover:border-accent"
            >
              <h3 className="mb-2 text-lg font-semibold group-hover:text-accent">
                startwithbitcoin
              </h3>
              <p className="text-sm text-muted">
                The website you&apos;re looking at. Built with Next.js and Tailwind.
              </p>
              <code className="mt-4 block text-xs text-muted">
                github.com/bramkanstein/startwithbitcoin
              </code>
            </a>
            <a
              href={SITE_CONFIG.github.skill}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border p-6 transition-all hover:border-accent"
            >
              <h3 className="mb-2 text-lg font-semibold group-hover:text-accent">
                startwithbitcoin-skill
              </h3>
              <p className="text-sm text-muted">
                Claude Code skill for setting up Bitcoin agent capabilities.
              </p>
              <code className="mt-4 block text-xs text-muted">
                github.com/bramkanstein/startwithbitcoin-skill
              </code>
            </a>
          </div>
        </section>

        <section>
          <h2 className="mb-4">Guidelines</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Keep it simple</strong> - Write
              for developers who are new to Bitcoin and Nostr.
            </li>
            <li>
              <strong className="text-foreground">Test your code</strong> - Make
              sure all examples work before submitting.
            </li>
            <li>
              <strong className="text-foreground">Be respectful</strong> - Follow
              our code of conduct in all interactions.
            </li>
            <li>
              <strong className="text-foreground">Document your changes</strong> -
              Add clear commit messages and PR descriptions.
            </li>
          </ul>
        </section>

        <section className="border border-border bg-card p-6">
          <h2 className="mb-2 text-xl font-semibold">Questions?</h2>
          <p className="mb-4 text-muted">
            Open an issue on GitHub or start a discussion. We&apos;re happy to help
            with your first contribution.
          </p>
          <div className="flex gap-4">
            <Button href={SITE_CONFIG.github.website} variant="secondary">
              View on GitHub
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
