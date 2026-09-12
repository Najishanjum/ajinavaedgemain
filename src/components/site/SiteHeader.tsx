import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/services", label: "Services" },
  { to: "/community-partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="font-display text-2xl tracking-tight text-foreground">
            Ajinava<span className="text-primary">.</span>Edge
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative flex items-center px-3 py-2 text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/70 hover:text-foreground transition-colors"
              activeProps={{
                className:
                  "group relative flex items-center px-3 py-2 text-[11px] font-bold tracking-[0.22em] uppercase text-foreground",
              }}
            >
              <span className="opacity-0 -translate-x-1 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                [
              </span>
              <span className="px-1">{n.label}</span>
              <span className="opacity-0 translate-x-1 text-primary transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                ]
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a

            href="https://linktr.ee/ajinavaedge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-[11px] font-bold tracking-[0.22em] uppercase text-background hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-foreground/10"
          >
            Join Community
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-foreground/5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-foreground/5 px-4 py-3 space-y-1 bg-background/95 backdrop-blur">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-xs font-bold tracking-[0.22em] uppercase text-foreground/70 hover:text-foreground"
            >
              [ {n.label} ]
            </Link>
          ))}
          <a

            href="https://linktr.ee/ajinavaedge"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block text-center mt-3 rounded-full bg-foreground px-5 py-3 text-[11px] font-bold tracking-[0.22em] uppercase text-background"
          >
            Join Community
          </a>
        </div>
      )}
    </header>
  );
}
