import aiMl from "@/assets/services/ai-ml.jpg";
import webApp from "@/assets/services/web-app.jpg";
import research from "@/assets/services/research.jpg";
import edtech from "@/assets/services/edtech.jpg";
import incubation from "@/assets/services/incubation.jpg";
import data from "@/assets/services/data.jpg";
import internship from "@/assets/services/internship.jpg";

import posterYesist12 from "@/assets/partners/poster-yesist12.png";
import posterHackBaroda from "@/assets/partners/poster-hackbaroda.png";
import posterOSW from "@/assets/partners/poster-osw.png";
import posterBharatTech from "@/assets/partners/poster-bharattech.png";
import posterEnfinity from "@/assets/partners/poster-enfinity.png";
import posterPhoenix from "@/assets/partners/poster-phoenix.png";
import posterCodeNakshatra from "@/assets/partners/poster-codenakshatra.png";
import posterVerge from "@/assets/partners/poster-verge.png";
import posterEliteHack from "@/assets/partners/poster-elitehack.png";
import codecrafter from "@/assets/partners/codecrafter.png";
import posterCommunityPartner from "@/assets/partners/poster-community-partner.png";
import posterHacknwin from "@/assets/partners/poster-hacknwin.png";
import posterCyberSentinels from "@/assets/partners/poster-cyber-sentinels.png";
import posterTechtribeDevaix from "@/assets/partners/poster-techtribe-devaix.png";
import posterGirlsWhoYap from "@/assets/partners/poster-girls-who-yap.png";
import posterEscapeDavinci from "@/assets/partners/poster-escape-davinci.png";
import posterCodezen from "@/assets/partners/poster-codezen.png";
import posterCalcuttaHacks from "@/assets/partners/poster-calcutta-hacks.png";
import posterFossHack from "@/assets/partners/poster-foss-hack.png";
const posterJinn = "/images/poster-jinn.png";
const posterTechmate = "/images/poster-techmate.png";
const posterBlackbox = "/images/poster-blackbox.png";
const posterCraftora = "/images/poster-craftora.png";
import aeContestImg from "@/assets/events/ae-contest.jpeg";
const aeMeetupJabalpur = "/images/ae-meetup-jabalpur.png";
const githubWorkshop = "/images/github-workshop.jpeg";
const edgeHack2026 = "/images/edge-hack-2026.jpeg";
const dsaSession = "/images/dsa-session.png";
const graphicDesignWorkshop = "/images/graphic-design-workshop.png";
import ideaToMvp from "@/assets/events/idea-to-mvp.jpg";

export const services = [
  {
    icon: "Sparkles",
    title: "AI & ML Solutions",
    desc: "Custom artificial intelligence and machine learning models tailored to your business needs.",
    image: aiMl,
    tags: ["Predictive Analytics", "NLP", "Computer Vision", "GenAI"],
    features: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision Pipelines",
      "Custom GPT Agents & RAG",
    ],
  },
  {
    icon: "Globe",
    title: "Web & App Development",
    desc: "Full-stack development services creating scalable and performant digital solutions.",
    image: webApp,
    tags: ["React", "Next.js", "React Native", "Node"],
    features: [
      "React & Next.js",
      "Mobile Apps (iOS / Android)",
      "API & Backend Engineering",
      "Performance & SEO Optimization",
    ],
  },
  {
    icon: "FlaskConical",
    title: "Research & Innovation",
    desc: "Cutting-edge research in emerging technologies and innovative problem-solving methodologies.",
    image: research,
    tags: ["R&D", "Prototyping", "Innovation Labs"],
    features: [
      "Technology Research",
      "Innovation Labs",
      "Rapid Prototyping",
      "White-papers & PoCs",
    ],
  },
  {
    icon: "GraduationCap",
    title: "Ed-Tech Initiatives",
    desc: "Educational technology solutions and training programs for skill development.",
    image: edtech,
    tags: ["LMS", "Workshops", "Bootcamps"],
    features: [
      "Online Courses",
      "Workshops & Bootcamps",
      "Custom Learning Platforms",
      "Mentor Programs",
    ],
  },
  {
    icon: "Rocket",
    title: "Startup Incubation",
    desc: "Support and resources for early-stage startups to transform ideas into successful ventures.",
    image: incubation,
    tags: ["Idea → MVP", "Funding", "Go-to-market"],
    features: [
      "Business Planning",
      "Funding Guidance",
      "MVP Engineering",
      "Mentor & Investor Network",
    ],
  },
  {
    icon: "Database",
    title: "Data Solutions",
    desc: "Comprehensive data management, analytics, and visualization services.",
    image: data,
    tags: ["Big Data", "Warehousing", "BI"],
    features: [
      "Big Data Engineering",
      "Data Warehousing",
      "Dashboards & BI",
      "ETL & Real-time Pipelines",
    ],
  },
  {
    icon: "Briefcase",
    title: "Internship Program",
    desc: "Professional training and real-world experience for students, freshers, and final-year graduates looking to kickstart their tech careers.",
    image: internship,
    tags: ["3–6 months", "Remote / Onsite", "Certified"],
    features: [
      "Duration: Flexible 3–6 months (Remote / Onsite)",
      "Tech: AI/ML, Cloud, Web Dev, Java & more",
      "Live projects with mentors",
      "Certificate + LOR on completion",
    ],
  },
] as const;

export const events = [
  {
    date: "Apr 13 – Apr 30, 2026",
    title: "AE Referral Contest 1.0 — 100K Prize Pool",
    type: "Contest",
    location: "Online · Worldwide",
    desc: "20 days of community-powered fun! Theme: The Power of Connection. Request your personal referral link, share it with friends and on socials, and climb the leaderboard for the 1st–4th prizes. NB: Your referral only counts when the number is saved.",
    image: aeContestImg,
    link: "https://www.aecontest.online",
    cta: "See the Winners",
  },
  {
    date: "Tuesday, 05 May 2026",
    title: "AE Meet Up Jabalpur — The Edge Meets The City",
    type: "Community Event",
    location: "Jabalpur, India",
    desc: "Connect. Learn. Grow. Be ready — AE Meet Up Jabalpur brings the community together for a night of networking, sharing, inspiration and growth. \"Great things happen outside your comfort zone.\" Let's create what matters.",
    image: aeMeetupJabalpur,
  },
  {
    date: "Sunday, 5 July 2026 · 7:30 – 8:30 PM",
    title: "GitHub Basics Workshop — From Zero to Portfolio",
    type: "Workshop",
    location: "Online · Live Session",
    desc: "Beginner-friendly online workshop by Ajinava Edge. Learn what GitHub is, how to create repositories, upload projects, write a README.md, build your GitHub portfolio, the basics of Git & version control, and how GitHub helps in internships, jobs, hackathons & open source. Perfect for students, beginners, and aspiring developers.",
    image: githubWorkshop,
    link: "https://luma.com/j4p0ddxj",
    cta: "Register Now",
    secondaryLink: "https://www.youtube.com/live/Jx1GijQzaK0?si=zHefCERIp4daVX5O",
    secondaryCta: "Watch Session",
  },
  {
    date: "Registrations Open · Submission by 15 July 2026",
    title: "Edge Hack 2026 — The Future is Edge",
    type: "Hackathon",
    location: "Online Hackathon",
    desc: "Ajinava Edge presents Edge Hack 2026. Innovate. Build. Transform. Join innovators, developers, and dreamers to build impactful solutions. Strict timelines — Team & Theme Finalization: 10 July 2026 · Final Deployed Submission: 15 July 2026. Show the world what you can create at the edge of innovation. Stop pitching. Start shipping.",
    image: edgeHack2026,
    link: "https://unstop.com/o/XEy0I1D?lb=9iah7I74&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Mdmoi4890",
    cta: "Register Now",
  },
  {
    date: "20 June 2026",
    title: "Graphic Design Workshop — Learn, Create & Design",
    type: "Workshop",
    location: "Online",
    desc: "Ajinava Edge is hosting an interactive online Graphic Design Workshop for students, beginners, content creators, community members, and anyone interested in building practical design skills. Learn typography, color theory, branding, poster design, and Canva/Figma basics.",
    image: graphicDesignWorkshop,
    link: "https://luma.com/s4972yow",
    cta: "Register to Join",
  },
  {
    date: "Apr 12, 2026",
    title: "From Idea to MVP — Workshop",
    type: "Workshop",
    location: "Online",
    desc: "Live-build a startup MVP using Lovable, React and Supabase in 3 hours. From concept to reality — validate your idea, build fast with no-code, get expert mentorship, and launch your MVP.",
    image: ideaToMvp,
  },
  {
    date: "10 January 2026 · 7:30 PM onwards",
    title: "DSA Session Day 1 — From Basics to Clarity (in C)",
    type: "Session",
    location: "Online · Live",
    desc: "Are you still confused with Data Structures & Algorithms or unsure how to even begin? This 2-Day DSA Session is specially designed for engineering students and beginners who find DSA complex but essential. Basic concepts of C, real examples, live interaction & doubt discussion. Hosted by Raj Sen, CTO, Ajinava Edge.",
    image: dsaSession,
    link: "https://www.youtube.com/live/1bq3GfbZ0BM?si=DCSkdsaB6uRNz1rJ",
    cta: "Watch Session",
  },
];

export const announcements = [
  {
    tag: "New",
    date: "Apr 19, 2026",
    title: "Ajinava Edge AI Studio is live",
    body: "Our new in-house AI studio helps startups ship custom GPT agents and RAG apps in days, not months.",
  },
  {
    tag: "Community",
    date: "Apr 10, 2026",
    title: "We crossed 5,000 community members 🎉",
    body: "Thank you to every builder who joined us. New mentorship tracks coming next month.",
  },
  {
    tag: "Partnership",
    date: "Mar 30, 2026",
    title: "Ajinava Edge x CodeHive partnership",
    body: "Exclusive workshops and joint hackathons rolling out across India and SEA.",
  },
];

export const partners = [
  { name: "Escape Da-Vinci", role: "Tamboobaba × Ascent Circle · ₹2,00,000 Prize Pool", logo: posterEscapeDavinci },
  { name: "Hack-N-Win 3.0", role: "D4 Community · Welcoming Ajinava Edge", logo: posterHacknwin },
  { name: "Republic of Cyber Sentinels", role: "Official Community Partner · 30 Jan", logo: posterCyberSentinels },
  { name: "TechTribe × DevAIx", role: "Community Partner · Feb 21, 2026 · Noida", logo: posterTechtribeDevaix },
  { name: "Girls Who Yap Conf", role: "Powered by DoraDAO × Ajinava Edge", logo: posterGirlsWhoYap },
  { name: "Codezen 2", role: "Code Geeks · Feb 2026 · Delhi NCR", logo: posterCodezen },
  { name: "Calcutta <Hacks/>", role: "Apex Circle × GDG · Heritage · Innovation", logo: posterCalcuttaHacks },
  { name: "FOSS Hack 2026", role: "FOSS United · 01–31 March · Hybrid", logo: posterFossHack },
  { name: "Introducing Community Partner", role: "Tamboobaba · Genesis · Innovxus · Ascent · EDV", logo: posterCommunityPartner },
  { name: "YESIST12 2026", role: "CGC Landran × IEEE · Indonesia Finale", logo: posterYesist12 },
  { name: "Hack Baroda", role: "Coder's Corner · Vadodara · 12-hr Offline", logo: posterHackBaroda },
  { name: "Open Source Weekend", role: "OSW · Connect · Share · Thrive", logo: posterOSW },
  { name: "BharatTech Xperience 3", role: "The Uniques Community · Hackathon of a lifetime", logo: posterBharatTech },
  { name: "Enfinity by WolfStreet", role: "CEV · Powering Infinite Possibilities", logo: posterEnfinity },
  { name: "Phoenix 2026", role: "Xplorica × Future Education · 25 Years", logo: posterPhoenix },
  { name: "Code Nakshatra II", role: "Code Rangers × TIIPS · Stars aligned", logo: posterCodeNakshatra },
  { name: "Verge 26", role: "SRM University Delhi-NCR · Technical Fest", logo: posterVerge },
  { name: "Elite Hack 1.0", role: "Elite Coders · 50K+ Prize · Global", logo: posterEliteHack },
  { name: "Code Crafter 3.0", role: "CT University · Hackathon", logo: codecrafter },
  { name: "Jinn × Ajinava Edge", role: "Stronger Together · Building Beyond Tomorrow", logo: posterJinn },
  { name: "TechMate 2K26", role: "PW Institute of Innovation · Powered by Unstop", logo: posterTechmate },
  { name: "The Blackbox Protocol", role: "Tech Help 4U × Blackbox · Community Partner", logo: posterBlackbox },
  { name: "Craftora Creator League", role: "OSEN × Craftora · Community Partner", logo: posterCraftora },
];

export const highlightVideos = [
  { id: "rlKgWrCr4WU" },
  { id: "kx1gchhQ-Fs" },
  { id: "2F-ILgNP-kE" },
  { id: "PGe9hnqhyys" },
  { id: "gclVGPGSV0M", cta: { label: "Follow Now", href: "https://whatsapp.com/channel/0029Vb5Znw9LdQeVRFBK8Q2s" } },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/ajinava-edge-in/",
  instagram: "https://www.instagram.com/ajinava.edge.official/",
  youtube: "https://www.youtube.com/@AJINAVAEDGE",
  whatsapp: "https://chat.whatsapp.com/IJw256xuepP956JsufMY6g",
  whatsappChannel: "https://whatsapp.com/channel/0029Vb5Znw9LdQeVRFBK8Q2s",
  x: "https://x.com/Ajinavaedge",
  facebook: "https://www.facebook.com/share/1GwtJaxpYs/",
  threads: "https://www.threads.net/@ajinava.edge",
  telegram: "https://t.me/ajinavaedge",
  substack: "https://ajinavaedge.substack.com",
  linktree: "https://linktr.ee/ajinavaedge",
};
