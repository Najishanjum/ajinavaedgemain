import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RoleApplyDialog, CommunityRole } from "@/components/community/RoleApplyDialog";

interface RoleCardProps {
  prefix: string;
  role: string;
  description: string;
  buttonText: string;
  onSelect: () => void;
  delay?: number;
}

function RoleCard({ prefix, role, description, buttonText, onSelect, delay = 0 }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group h-full"
    >
      {/* Outer card with double border styling matching reference */}
      <div className="h-full bg-[#F5F1E9] text-[#121212] border-[2.5px] border-black p-2 rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Inner bordered container */}
        <div className="h-full border border-black/80 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Cursive / script prefix */}
            <div className="font-['Caveat',cursive] text-xl sm:text-2xl text-black/85 leading-tight">
              {prefix}
            </div>

            {/* Role title */}
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-black mt-1 uppercase">
              {role}
            </h3>

            {/* Description */}
            <p className="text-black/85 text-sm sm:text-[15px] leading-relaxed mt-5 font-sans">
              {description}
            </p>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-2">
            <button
              type="button"
              onClick={onSelect}
              className="w-full bg-[#181716] text-[#FAF7F2] hover:bg-black py-3 px-5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 group-hover:bg-[#0d0d0d]"
            >
              <span>{buttonText}</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function JoinRoleSection() {
  const [selectedRole, setSelectedRole] = useState<CommunityRole | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#181716] text-[#F5F1E9] py-20 sm:py-28 px-4 sm:px-6 lg:px-10 border-t border-white/10">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97757]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Subtitle tag with asterism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-[#F5F1E9] text-xl leading-none">✻</span>
          <span className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#F5F1E9]/90 tracking-wide">
            open calls & participation
          </span>
        </motion.div>

        {/* Section Heading matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 sm:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            Join Ajinava Edge Community —
            <br />
            <span className="font-['Newsreader',Georgia,serif] italic font-normal text-[#D97757] tracking-normal">
              pick your role.
            </span>
          </h2>
        </motion.div>

        {/* 3 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <RoleCard
            prefix="as a Community"
            role="PARTNER"
            description="Co-host workshops, share a venue, bring your members."
            buttonText="Collaborate"
            onSelect={() => setSelectedRole("partner")}
            delay={0.15}
          />
          <RoleCard
            prefix="as a"
            role="SPEAKER / MENTOR"
            description="Give a talk, run a session, or mentor at the Impact Lab."
            buttonText="Submit CFP"
            onSelect={() => setSelectedRole("speaker")}
            delay={0.25}
          />
          <RoleCard
            prefix="as a"
            role="VOLUNTEER"
            description="Check-in, stage, photos, and making people feel welcome."
            buttonText="Join Crew"
            onSelect={() => setSelectedRole("volunteer")}
            delay={0.35}
          />
        </div>
      </div>

      {/* Role Application Dialog */}
      <RoleApplyDialog
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
      />
    </section>
  );
}
