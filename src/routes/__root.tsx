import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { IntroAnimation } from "@/components/site/IntroAnimation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ajinava Edge — Smart IT Solutions & Community" },
      {
        name: "description",
        content:
          "Ajinava Edge builds AI-powered web, mobile and cloud products. Join our developer community for events, mentorship and growth.",
      },
      { property: "og:title", content: "Ajinava Edge — Smart IT Solutions & Community" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Ajinava Edge — Smart IT Solutions & Community" },
      { name: "description", content: "An AI-powered chatbot enhances an IT services website, offering intelligent assistance and lead generation." },
      { property: "og:description", content: "An AI-powered chatbot enhances an IT services website, offering intelligent assistance and lead generation." },
      { name: "twitter:description", content: "An AI-powered chatbot enhances an IT services website, offering intelligent assistance and lead generation." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/wbdIs7HOZpUEElghR37B7QHkJ8b2/social-images/social-1776794555670-Screenshot_2026-04-21_233153.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/wbdIs7HOZpUEElghR37B7QHkJ8b2/social-images/social-1776794555670-Screenshot_2026-04-21_233153.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cabin:wght@400;500;600;700&family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400..700&family=Orbitron:wght@600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <IntroAnimation />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
