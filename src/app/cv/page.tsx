import type { Metadata } from "next";
import { cvData } from "@/lib/data/cv";
import { timeline } from "@/lib/data/timeline";
import { skills, languages } from "@/lib/data/skills";
import {
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Phone,
  Calendar,
  Award,
  Download,
  Star,
  Briefcase,
  Gamepad2,
  Building2,
  Bot,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shahrukh Yousafzai — CV",
  description: "Professional CV of Shahrukh Yousafzai — Game Developer, Creative Engineering Founder",
};

export default function CVPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      {/* Print Button */}
      <div className="mx-auto mb-4 max-w-[210mm] px-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
        >
          Save as PDF / Print
        </button>
        <span className="ml-3 text-sm text-gray-500">
          Tip: In print dialog, select &quot;Save as PDF&quot; as destination
        </span>
      </div>

      {/* CV Container — A4 size */}
      <div className="cv-page mx-auto max-w-[210mm] bg-white shadow-xl print:shadow-none print:max-w-none">

        {/* ─── HEADER ─── */}
        <div className="bg-[#1a1a2e] px-10 py-8 text-white print:px-8 print:py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Shahrukh Yousafzai
              </h1>
              <p className="mt-1 text-base font-medium text-blue-300">
                Game Developer · Creative Engineering Founder · AI Builder
              </p>
            </div>
            <div className="text-right text-sm leading-relaxed text-gray-300">
              <p className="flex items-center justify-end gap-2">
                <Mail className="h-3.5 w-3.5" />
                shahrukhyousafzaipk@gmail.com
              </p>
              <p className="flex items-center justify-end gap-2">
                <MapPin className="h-3.5 w-3.5" />
                Lahore, Pakistan
              </p>
              <p className="flex items-center justify-end gap-2">
                <Globe className="h-3.5 w-3.5" />
                shahrukhyousafzai.netlify.app
              </p>
              <p className="flex items-center justify-end gap-2">
                <Linkedin className="h-3.5 w-3.5" />
                linkedin.com/in/shahrukh-yousafzai-pk
              </p>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* ─── LEFT SIDEBAR ─── */}
          <div className="w-[72mm] bg-[#f8f9fa] px-6 py-6 print:px-5 print:py-5">
            {/* Key Stats */}
            <Section title="Key Stats" sidebar>
              <div className="space-y-2.5">
                <StatItem label="Experience" value={`${currentYear - 2017}+ Years`} />
                <StatItem label="Projects Delivered" value="169+" />
                <StatItem label="App Downloads" value="1M+" />
                <StatItem label="Client Rating" value="5.0 / 5.0" />
                <StatItem label="Repeat Clients" value="75%" />
                <StatItem label="Countries Served" value="21+" />
                <StatItem label="Earnings" value="$150K+" />
              </div>
            </Section>

            {/* Technical Skills */}
            <Section title="Technical Skills" sidebar>
              <div className="space-y-3">
                <SkillGroup
                  title="Game Development"
                  items={["Unity", "C#", "Photon", "Firebase", "Web3/Blockchain"]}
                />
                <SkillGroup
                  title="App Development"
                  items={["Android", "iOS", ".NET", "XAML"]}
                />
                <SkillGroup
                  title="Web & Frontend"
                  items={["React", "TypeScript", "Next.js", "Tailwind CSS"]}
                />
                <SkillGroup
                  title="AI & Tools"
                  items={["AI Chatbots", "GenAI", "Python", "Figma"]}
                />
              </div>
            </Section>

            {/* Education */}
            <Section title="Education" sidebar>
              <div className="space-y-3">
                {cvData.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-[#1a1a2e]">{edu.degree}</p>
                    <p className="text-[11px] text-gray-600">{edu.institution}</p>
                    <p className="text-[10px] text-gray-400">{edu.date}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section title="Languages" sidebar>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded bg-[#1a1a2e] px-2 py-0.5 text-[10px] font-medium text-white"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Section>

            {/* Studios Founded */}
            <Section title="Studios Founded" sidebar>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Building2 className="mt-0.5 h-3 w-3 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a1a2e]">AFS Creative Studio</p>
                    <p className="text-[10px] text-gray-500">Creative services agency</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Gamepad2 className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a1a2e]">Efface Studios</p>
                    <p className="text-[10px] text-gray-500">Games product house (2017)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Bot className="mt-0.5 h-3 w-3 shrink-0 text-purple-500" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#1a1a2e]">AFS Agentics</p>
                    <p className="text-[10px] text-gray-500">AI product studio</p>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* ─── MAIN CONTENT ─── */}
          <div className="flex-1 px-8 py-6 print:px-6 print:py-5">
            {/* Professional Summary */}
            <Section title="Professional Summary">
              <p className="text-[11.5px] leading-relaxed text-gray-700">
                Creative engineering founder with {currentYear - 2017}+ years of experience shipping
                production-scale software across three studios — games, creative services, and AI
                products. Delivered 169+ freelance projects for clients in 21+ countries with a
                consistent 5.0 rating and 75% repeat client rate. Founded Efface Studios (Google
                Play publisher, 1M+ downloads), AFS Creative Studio (managed engineering squads for
                startups worldwide), and AFS Agentics (AI product company). Proficient in Unity, C#,
                multiplayer systems, Web3 integrations, and full-stack development.
              </p>
            </Section>

            {/* Experience Timeline */}
            <Section title="Experience & Milestones">
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-blue-500 before:content-['']">
                    <div className="flex items-baseline justify-between">
                      <p className="text-xs font-bold text-[#1a1a2e]">{item.title}</p>
                      <p className="text-[10px] text-gray-400">{item.date}</p>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Key Projects */}
            <Section title="Key Projects">
              <div className="space-y-2.5">
                <ProjectItem
                  name="Basant Mela"
                  tech="Unity3D, Simulation"
                  result="1M+ organic downloads on Google Play · #4 Trending in Sports (Pakistan) · Featured in United News of Bangladesh"
                />
                <ProjectItem
                  name="Solar Dominion"
                  tech="Unity3D, Web3, Multiplayer"
                  result="Published on Epic Games Store · Multiplayer shooter with prize-based ranking system"
                />
                <ProjectItem
                  name="AI Assignment Writer"
                  tech="Unity3D, AI, Mobile"
                  result="50,000+ downloads · Popular student productivity tool worldwide"
                />
                <ProjectItem
                  name="RugDollz World"
                  tech="Unity3D, Web3, Multiplayer"
                  result="Mini-games library with Web2/Web3 compatibility · PvP shooter, racing, treasure hunting"
                />
                <ProjectItem
                  name="MultiPlanetary Inus"
                  tech="Unity3D, Web3, MMORPG"
                  result="NFT blockchain-based MMORPG with decentralized gaming ecosystem"
                />
                <ProjectItem
                   name="LoopCode (AFS Agentics)"
                  tech="AI, Desktop App"
                  result="Free ad-supported AI coding tool · Private beta · CLI + Web playground upcoming"
                />
              </div>
            </Section>

            {/* Achievements */}
            <Section title="Key Achievements">
              <ul className="space-y-1.5">
                <AchievementItem text="Attained 1M+ organic downloads on Google Play Store for self-published games" />
                <AchievementItem text="169+ freelance projects completed with consistent 5-star ratings across Fiverr & Upwork" />
                <AchievementItem text="$150K+ earned across freelance platforms serving clients in 21+ countries" />
                <AchievementItem text="75% repeat client rate — majority of clients return for multiple projects" />
                <AchievementItem text="Games featured in tech publications including United News of Bangladesh & Editorialge" />
                <AchievementItem text="Founded and scaled 3 studios simultaneously while completing BS Digital Marketing" />
              </ul>
            </Section>

            {/* Freelance Platforms */}
            <Section title="Freelance Presence">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded border border-gray-200 p-3">
                  <p className="text-xs font-bold text-[#1a1a2e]">Fiverr</p>
                  <p className="text-[10px] text-gray-500">Level 2 Seller · 5.0 Rating</p>
                  <p className="mt-1 text-[10px] text-blue-600">fiverr.com/users/shahrukhkhan9</p>
                </div>
                <div className="rounded border border-gray-200 p-3">
                  <p className="text-xs font-bold text-[#1a1a2e]">Upwork</p>
                  <p className="text-[10px] text-gray-500">Top Rated · 5.0 Rating</p>
                  <p className="mt-1 text-[10px] text-blue-600">upwork.com/freelancers/~01d270e621d61cf22f</p>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */

function Section({
  title,
  children,
  sidebar = false,
}: {
  title: string;
  children: React.ReactNode;
  sidebar?: boolean;
}) {
  return (
    <div className={sidebar ? "mb-5" : "mb-5"}>
      <h2
        className={`mb-2.5 border-b pb-1 text-xs font-bold uppercase tracking-wider text-[#1a1a2e] ${
          sidebar ? "border-blue-200" : "border-gray-300"
        }`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[10px] text-gray-500">{label}</span>
      <span className="text-[11px] font-bold text-[#1a1a2e]">{value}</span>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold text-[#1a1a2e]">{title}</p>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <span
            key={item}
            className="rounded bg-gray-200 px-1.5 py-0.5 text-[9.5px] text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectItem({
  name,
  tech,
  result,
}: {
  name: string;
  tech: string;
  result: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <p className="text-[11.5px] font-bold text-[#1a1a2e]">{name}</p>
        <p className="text-[10px] text-gray-400">({tech})</p>
      </div>
      <p className="text-[10.5px] text-gray-600">{result}</p>
    </div>
  );
}

function AchievementItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[11px] text-gray-700">
      <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
      {text}
    </li>
  );
}
