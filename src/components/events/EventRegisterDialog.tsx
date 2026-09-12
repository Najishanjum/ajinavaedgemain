import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function eventSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function EventRegisterDialog({
  eventTitle,
  onClose,
}: {
  eventTitle: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", note: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (form.name.trim().length < 2) return toast.error("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      return toast.error("Please enter a valid email address.");

    setBusy(true);
    const { error } = await supabase.from("event_registrations").insert({
      event_slug: eventSlug(eventTitle),
      event_title: eventTitle.slice(0, 200),
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 255),
      phone: form.phone.trim().slice(0, 30) || null,
      organization: form.organization.trim().slice(0, 150) || null,
      note: form.note.trim().slice(0, 1000) || null,
    });
    setBusy(false);

    if (error) {
      if (error.code === "23505" || error.code === "23000" || /duplicate/i.test(error.message)) {
        toast.error("You're already registered for this event with that email.");
        return;
      }
      toast.error("Couldn't save your registration. Please try again.");
      return;
    }
    setDone(true);
    toast.success("You're in! Check your inbox for details.");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Register for ${eventTitle}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
          className="glass w-full max-w-md rounded-3xl p-7 shadow-elegant max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary">
                Reserve your seat
              </div>
              <h3 className="font-display text-xl font-bold mt-2 leading-snug">{eventTitle}</h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-1.5 hover:bg-foreground/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {done ? (
            <div className="mt-8 text-center py-6">
              <CheckCircle2 className="mx-auto text-primary" size={44} />
              <p className="font-display text-lg font-bold mt-4">Registration confirmed</p>
              <p className="text-sm text-muted-foreground mt-2">
                We'll email you the joining details before the event starts.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-background hover:bg-primary transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <Field label="Full name *">
                <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Aarav Sharma" />
              </Field>
              <Field label="Email *">
                <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@example.com" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone">
                  <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+91…" />
                </Field>
                <Field label="College / Company">
                  <input value={form.organization} onChange={set("organization")} className={inputCls} placeholder="Optional" />
                </Field>
              </div>
              <Field label="Anything we should know?">
                <textarea rows={3} value={form.note} onChange={set("note")} className={inputCls} placeholder="Optional" />
              </Field>
              <button
                type="submit"
                disabled={busy}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-edge px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-50 hover:scale-[1.01] transition-transform"
              >
                {busy && <Loader2 size={15} className="animate-spin" />}
                {busy ? "Saving…" : "Confirm registration"}
              </button>
              <p className="text-[11px] text-muted-foreground text-center pt-1">
                We only use your details to send event information.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
