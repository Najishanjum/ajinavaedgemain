import type { ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import {
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  AtSign,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { socialLinks } from "@/lib/site-data";

type IconType = ComponentType<{ size?: number }>;

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.125.038.329.021.492-.18 1.897-.96 6.502-1.357 8.627-.168.9-.499 1.201-.82 1.231-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.717zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function SubstackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

export function SiteFooter() {
  const socials: { Icon: IconType; href: string; label: string }[] = [
    { Icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { Icon: XIcon, href: socialLinks.x, label: "X (Twitter)" },
    { Icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
    { Icon: AtSign, href: socialLinks.threads, label: "Threads" },
    { Icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
    { Icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
    { Icon: TelegramIcon, href: socialLinks.telegram, label: "Telegram" },
    { Icon: WhatsAppIcon, href: socialLinks.whatsapp, label: "WhatsApp Community" },
    { Icon: WhatsAppIcon, href: socialLinks.whatsappChannel, label: "WhatsApp Channel" },
    { Icon: SubstackIcon, href: socialLinks.substack, label: "Substack" },
    { Icon: LinkIcon, href: socialLinks.linktree, label: "Linktree" },
  ];

  return (
    <footer className="mt-20 border-t border-border/50 bg-background/50 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <h3 className="font-display text-xl font-bold">
            Ajinava <span className="text-gradient">Edge</span>
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Smart IT solutions, AI products, and a community where builders sharpen
            their edge. From idea to launch — we engineer the future.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="p-2 rounded-full glass hover:shadow-glow hover:scale-110 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-5 items-center gap-2 rounded-full bg-gradient-edge px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
          >
            <WhatsAppIcon size={14} /> Join Community
          </a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/announcements" className="hover:text-foreground">Announcements</Link></li>
            <li><Link to="/community-partners" className="hover:text-foreground">Partners</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="mailto:ajinavaedge@gmail.com" className="flex items-start gap-2 hover:text-foreground">
                <Mail size={14} className="mt-0.5 shrink-0" />
                <span>ajinavaedge@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+919109530117" className="flex items-start gap-2 hover:text-foreground">
                <Phone size={14} className="mt-0.5 shrink-0" />
                <span>+91 9109530117</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Jabalpur, Madhya Pradesh, India 482004</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ajinava Edge · Powered by Team ILM Tech
      </div>
    </footer>
  );
}
