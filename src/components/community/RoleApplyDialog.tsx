import { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

export type CommunityRole = "partner" | "speaker" | "volunteer";

interface RoleApplyDialogProps {
  role: CommunityRole | null;
  onClose: () => void;
}

const roleDetails: Record<CommunityRole, { title: string; subtitle: string; perks: string[]; defaultNote: string }> = {
  partner: {
    title: "Community Partner",
    subtitle: "Co-host workshops, share a venue, or bring your community members together.",
    perks: ["Co-branding on hackathons & summits", "Joint workshop curation & mentorship", "Access to 5,000+ builder network"],
    defaultNote: "Tell us about your community or company and how you'd like to collaborate...",
  },
  speaker: {
    title: "Speaker / Mentor",
    subtitle: "Give a talk, run a hands-on session, or mentor at our Impact Lab.",
    perks: ["Global developer reach & stage presence", "Direct impact on early-stage builders", "Ajinava Edge Speaker Honor Roll & perks"],
    defaultNote: "Share your proposed talk title, key takeaways, and your bio or LinkedIn...",
  },
  volunteer: {
    title: "Volunteer & Crew",
    subtitle: "Check-in, stage coordination, photography, logistics, and making people feel welcome.",
    perks: ["Exclusive crew swag & VIP event passes", "Direct networking with founders & speakers", "Certificate of Leadership & Contribution"],
    defaultNote: "Tell us what areas you're excited to help with (Stage, Check-in, Tech, Photos)...",
  },
};

export function RoleApplyDialog({ role, onClose }: RoleApplyDialogProps) {
  const [activeRole, setActiveRole] = useState<CommunityRole>(role || "partner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!role) return null;

  const current = roleDetails[activeRole];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#181716] border border-white/15 text-[#F6F2EA] shadow-2xl p-7 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Application Received!</h3>
            <p className="mt-2 text-sm text-white/70 max-w-sm mx-auto">
              Thank you for stepping up as a <span className="text-[#D97757] font-semibold">{current.title}</span>. Our community team will get in touch with you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/90"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#D97757] text-xs uppercase tracking-widest font-bold">
              <span>✻ Open Call</span>
            </div>

            {/* Tab switch */}
            <div className="mt-4 flex rounded-xl bg-white/5 p-1 border border-white/10">
              {(["partner", "speaker", "volunteer"] as CommunityRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveRole(r)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    activeRole === r
                      ? "bg-[#F6F2EA] text-black shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {r === "partner" ? "Partner" : r === "speaker" ? "Speaker" : "Volunteer"}
                </button>
              ))}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-5 text-white">
              Join as a <span className="text-[#D97757] italic">{current.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1.5 leading-relaxed">
              {current.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Sharma"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  LinkedIn / Website / Portfolio
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  How would you like to contribute?
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={current.defaultNote}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] text-black hover:bg-[#eae4d5] py-3 text-xs font-bold uppercase tracking-[0.2em] transition"
              >
                Submit Application <ArrowRight size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
