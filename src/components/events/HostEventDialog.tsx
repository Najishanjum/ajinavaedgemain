import { useState } from "react";
import { X, CheckCircle2, Sparkles, Building2, Users, Calendar, MapPin, ArrowRight } from "lucide-react";

export type HostEventType = "community" | "official";

interface HostEventDialogProps {
  type: HostEventType | null;
  onClose: () => void;
}

export function HostEventDialog({ type, onClose }: HostEventDialogProps) {
  const [activeType, setActiveType] = useState<HostEventType>(type || "community");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [attendees, setAttendees] = useState("50-100");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!type) return null;

  const isOfficial = activeType === "official";

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
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#181716] border border-white/15 text-[#F6F2EA] shadow-2xl p-6 sm:p-8"
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
            <h3 className="font-display text-2xl font-bold text-white">Proposal Submitted!</h3>
            <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
              {isOfficial
                ? "Your application to host an official Ajinava Edge event has been received. Our community leads will review and reach out within 48 hours."
                : "Your event hosting request has been received. We're excited to partner with you and help amplify your event!"}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/90"
            >
              Back to Events
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary mb-2">
              <Sparkles size={14} />
              <span>Event Partnership & Hosting</span>
            </div>

            {/* Type selector */}
            <div className="mt-3 flex rounded-2xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveType("community")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                  !isOfficial
                    ? "bg-[#F6F2EA] text-black shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Users size={14} />
                Host Your Events
              </button>
              <button
                type="button"
                onClick={() => setActiveType("official")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
                  isOfficial
                    ? "bg-[#F6F2EA] text-black shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Building2 size={14} />
                Host Ajinava Edge Events
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {isOfficial ? (
                  <>
                    Host an Official <span className="text-[#D97757] italic">Ajinava Edge</span> Event
                  </>
                ) : (
                  <>
                    Host <span className="text-[#D97757] italic">Your Own</span> Event with Us
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                {isOfficial
                  ? "Bring the flagship Ajinava Edge experience to your university, tech hub, or city. We provide speaker support, official swag kits, sponsorship guidance, and marketing power."
                  : "Organizing a meetup, hackathon, workshop or AI demo? Leverage Ajinava Edge's network of 5,000+ builders, community channels, and event spaces to maximize your impact."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
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
                    placeholder="contact@domain.com"
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                    {isOfficial ? "University / Company / Chapter *" : "Organization / Community *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder={isOfficial ? "e.g. MANIT Bhopal or Tech Hub" : "e.g. AI Bhopal Club"}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                    City / Venue Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bhopal / Online"
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                    />
                    <MapPin size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                    {isOfficial ? "Event Format *" : "Event Name / Theme *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder={isOfficial ? "e.g. AI Hackathon / Tech Summit" : "e.g. Prompt Engineering Workshop"}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                    Target Date / Month
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={expectedDate}
                      onChange={(e) => setExpectedDate(e.target.value)}
                      placeholder="e.g. Next Month / Oct 2026"
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757]"
                    />
                    <Calendar size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  Expected Attendees
                </label>
                <select
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className="w-full rounded-xl bg-[#23211f] border border-white/15 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97757]"
                >
                  <option value="20-50">20 - 50 builders</option>
                  <option value="50-100">50 - 100 builders</option>
                  <option value="100-250">100 - 250 builders</option>
                  <option value="250+">250+ builders / Large scale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 font-medium mb-1.5">
                  {isOfficial
                    ? "Why would you like to host an official Ajinava Edge event?"
                    : "Tell us about the event & what support you need from Ajinava Edge"}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    isOfficial
                      ? "Tell us about your audience, facilities, campus backing, and expectations..."
                      : "E.g. looking for speaker recommendation, promotion to community, venue support..."
                  }
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D97757] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] text-black hover:bg-[#eae4d5] py-3 text-xs font-bold uppercase tracking-[0.2em] transition"
              >
                Submit Proposal <ArrowRight size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
