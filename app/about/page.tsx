import Image from "next/image"
import Link from "next/link"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"
import AnimateOnScroll from "@/components/animate-on-scroll"

const WALEED_ART = [
  "██╗    ██╗  █████╗  ██╗     ███████╗███████╗██████╗ ",
  "██║    ██║ ██╔══██╗ ██║     ██╔════╝██╔════╝██╔══██╗",
  "██║ █╗ ██║ ███████║ ██║     █████╗  █████╗  ██║  ██║",
  "██║███╗██║ ██╔══██║ ██║     ██╔══╝  ██╔══╝  ██║  ██║",
  "╚███╔███╔╝ ██║  ██║ ███████╗███████╗███████╗██████╔╝",
  " ╚══╝╚══╝  ╚═╝  ╚═╝ ╚══════╝╚══════╝╚══════╝╚═════╝ ",
]

const experience = [
  {
    period: "2025 - present",
    role: "Culture & Employee Experience Lead",
    company: "Elm Company (PIF subsidiary)",
    summary:
      "Built and shipped an AI product that saved SAR 1M+ and cut ticket volume by 48%. Leading EX for ~7,000 employees. Driving M&A integration across ~3,000 employees — building the playbooks, teams, and systems from scratch.",
  },
  {
    period: "2023 - 2025",
    role: "Culture & Employee Experience Consultant",
    company: "Elm Company",
    summary:
      "Built people analytics dashboards, prediction models, and AI capability programs. Led a data science team to deliver workforce insights and launched multiple internal products from zero.",
  },
  {
    period: "2022 - 2023",
    role: "Consultant & Business Analyst",
    company: "Baseqat Arabia Consulting",
    summary:
      "Shipped 15+ transformation projects for STC Group, Mobily, SANS, and GEA. Built strategy execution frameworks, led cross-functional teams, and delivered data-driven solutions end-to-end.",
  },
  {
    period: "2021 - 2022",
    role: "Independent Consultant (SME)",
    company: "Freelance & partner-led engagements",
    summary:
      "Built Power BI dashboards and analytics products for RCJY. Authored operations systems for SSC/HRSD. Solved complex process problems with data-first approaches.",
  },
] as const

const certBadges = [
  { name: "PMP", desc: "Project Management Professional", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pmp-600px-2eKqqRiTulSRuZefG1l7MwF0UGQXtf.webp" },
  { name: "PMI-RMP", desc: "Risk Management Professional", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/twitter_thumb_201604_pmi-rmp-600px-RJiobHS4HTvWedCML1XiwzNa5kfcvU.webp" },
  { name: "Prosci", desc: "Change Management Certified", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prosci_certified-Fa1e2a7tYuuhabGDjBC0jm7zE2O5PY.webp" },
  { name: "Lean Six Sigma", desc: "Green Belt Certified", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/green-belt-formation-ZxLReO0r1CWlV2q8PPKXx8JOfVRAft.webp" },
  { name: "McKinsey Forward", desc: "McKinsey Leadership Program", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fAxr6RxvxxnXpcQ3dWEApFWLimfkdp.webp" },
] as const

const credentials = [
  { name: "MBA (in progress)", icon: "🎓", desc: "UIUC Gies College of Business" },
  { name: "BE Mechanical Engineering", icon: "🏗", desc: "University of Jeddah" },
  { name: "Arabic + English", icon: "🌍", desc: "Bilingual Fluency" },
] as const

const skills = [
  "product building",
  "ai & ml products",
  "people analytics",
  "predictive dashboards",
  "strategy execution",
  "team leadership",
  "python & automation",
  "data science",
  "power bi",
  "problem solving",
  "digital transformation",
  "innovation",
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--term-black)] text-[var(--term-white)] font-mono flex flex-col">
      <MinimalNav />
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[var(--term-gray)] transition-colors hover:text-[var(--term-cyan)]">
            ← back to home
          </Link>

          {/* ASCII Name Header */}
          <div className="mb-8">
            <pre className="text-[var(--term-cyan)] text-[clamp(0.35rem,1vw,0.65rem)] leading-[1.15] whitespace-pre overflow-x-auto select-none">
              {WALEED_ART.join("\n")}
            </pre>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--term-gray)] mt-2">
              problem solver · product builder · strategy to execution
            </div>
          </div>

          <section className="rounded-xl overflow-hidden border border-[var(--term-line)]">
            <div className="flex items-center justify-between border-b border-[var(--term-line)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[var(--term-gray)]">
              <span>resume.md</span>
              <span>personal dossier</span>
            </div>

            <div className="grid gap-8 p-5 md:grid-cols-[280px_minmax(0,1fr)] md:p-6">
              <aside className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-[var(--term-line)] bg-[var(--term-darker)]">
                  <div className="relative aspect-[4/4.8]">
                    <Image src="/dbcf93d6-e01e-4308-bea1-11412058a5cd.webp" alt="Waleed Alghamdi" fill priority className="object-cover" />
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-7 text-[var(--term-gray)]">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-1">name</div>
                    <div className="text-[var(--term-white)]">Waleed Alghamdi</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-1">location</div>
                    <div className="text-[var(--term-white)]">Saudi Arabia</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-1">contact</div>
                    <a href="mailto:waok@outlook.sa" className="text-[var(--term-cyan)] hover:underline">
                      waok@outlook.sa
                    </a>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-1">links</div>
                    <div className="mt-1 space-y-1">
                      <a href="https://www.linkedin.com/in/waleedalghamdi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--term-cyan)] hover:underline">
                        <span className="font-bold">[in]</span> LinkedIn
                      </a>
                      <a href="https://github.com/wa1939" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--term-cyan)] hover:underline">
                        <span className="font-bold">&lt;/&gt;</span> GitHub
                      </a>
                      <a href="https://x.com/waleedpy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--term-cyan)] hover:underline">
                        <span className="font-bold">𝕏</span> X
                      </a>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="space-y-8">
                <div>
                  <div className="text-sm text-[var(--term-gray)]">
                    <span className="text-[var(--term-green)]">$</span> <span className="text-[var(--term-cyan)]">cat</span> about.txt
                  </div>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--term-white)] md:text-4xl">
                    I build products, lead teams, and turn strategy into execution.
                  </h1>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--term-gray)] max-w-3xl">
                    <p>
                      I solve hard problems. Whether it&apos;s building AI-powered products, leading data science teams, or launching new departments from zero — I move from idea to shipped outcome. I&apos;ve built people analytics platforms, predictive dashboards, AI capabilities, and transformation frameworks across 20+ organizations.
                    </p>
                    <p>
                      My work sits where innovation meets execution: designing products people actually use, leading cross-functional teams, and deploying data-driven strategies that create measurable impact. I don&apos;t just consult — I build, ship, and iterate.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    ["products built", "10+"],
                    ["organizations impacted", "20+"],
                    ["hackathon wins", "3"],
                    ["approach", "build × ship × iterate"],
                  ].map(([label, value], index) => (
                    <AnimateOnScroll key={label} delay={index * 80}>
                    <div className="rounded-lg border border-[var(--term-line)] bg-[var(--term-darker)] px-4 py-4">
                      <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)]">{label}</div>
                      <div className="mt-2 text-lg text-[var(--term-white)] font-bold">{value}</div>
                    </div>
                    </AnimateOnScroll>
                  ))}
                </div>

                {/* Experience Timeline */}
                <AnimateOnScroll>
                <div className="rounded-lg border border-[var(--term-line)] bg-[var(--term-darker)] px-4 py-5 whitespace-pre font-mono text-sm leading-[1.8] overflow-x-auto text-[var(--term-gray)]">
                  <div className="text-[var(--term-white)] mb-4">
                    <span className="text-[var(--term-green)]">$</span> tree ./experience
                  </div>
                  <div className="text-[var(--term-white)]">./experience</div>
                  {experience.map((item, idx) => {
                    const isLast = idx === experience.length - 1
                    return (
                      <div key={`${item.period}-${item.role}`}>
                        <div>{isLast ? "└──" : "├──"} <span className="text-[var(--term-gray)]">[{item.period}]</span> <span className="text-[var(--term-cyan)] uppercase tracking-wider text-xs">{item.company}</span></div>
                        <div>{isLast ? "    " : "│   "} └── <span className="text-[var(--term-white)]">{item.role}</span></div>
                        <div>{isLast ? "    " : "│   "}     <span className="text-[var(--term-gray)] whitespace-normal inline-block max-w-2xl align-top text-sm leading-6 mt-1 mb-4">{item.summary}</span></div>
                      </div>
                    )
                  })}
                </div>
                </AnimateOnScroll>

                {/* Skills */}
                <AnimateOnScroll>
                <div className="rounded-lg border border-[var(--term-line)] bg-[var(--term-darker)] px-4 py-4">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-3">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="border border-[var(--term-line)] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[var(--term-gray)] rounded-full hover:border-[var(--term-cyan)] hover:text-[var(--term-cyan)] transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                </AnimateOnScroll>

                {/* Certification Badges */}
                <AnimateOnScroll>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--term-gray)] mb-3">Certifications</div>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
                    {certBadges.map((badge) => (
                      <div key={badge.name} className="flex-shrink-0 group text-center">
                        <div className="w-[120px] h-[120px] rounded-xl border border-[var(--term-line)] bg-[var(--term-darker)] overflow-hidden hover:border-[var(--term-cyan)] transition-all duration-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={badge.image}
                            alt={badge.name}
                            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-2 text-[10px] font-bold text-[var(--term-gray)] group-hover:text-[var(--term-cyan)] transition-colors">{badge.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                </AnimateOnScroll>

                {/* Additional Credentials */}
                <AnimateOnScroll>
                <div className="flex gap-2">
                  {credentials.map((cred) => (
                    <div key={cred.name} className="flex items-center gap-2 rounded-lg border border-[var(--term-line)] bg-[var(--term-darker)] px-3 py-2 hover:border-[var(--term-cyan)] transition-colors group">
                      <span className="text-lg flex-shrink-0">{cred.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-[var(--term-white)] group-hover:text-[var(--term-cyan)] transition-colors">{cred.name}</div>
                        <div className="text-[10px] text-[var(--term-gray)]">{cred.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                </AnimateOnScroll>
              </div>
            </div>
          </section>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}
