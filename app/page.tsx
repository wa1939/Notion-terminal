import type { Metadata } from "next"
import Link from "next/link"
import MinimalNav from "@/components/minimal-nav"
import TerminalFooter from "@/components/terminal-footer"
import LiveClock from "@/components/live-clock"
import { formatPostDate } from "@/lib/format-post-date"
import { getAllPosts } from "@/lib/posts"
import BootTerminal from "@/components/boot-terminal"
import HalftoneImage from "@/components/halftone-image"
import SpotifyWidget from "@/components/spotify-widget"
import ApodWidget from "@/components/apod-widget"
import AnimateOnScroll from "@/components/animate-on-scroll"

export const metadata: Metadata = {
  title: "Waleed Alhamed — Problem Solver · Product Builder · Strategy to Execution",
  description:
    "I build products, lead teams, and turn strategy into execution. Consultant, builder, and AI product maker based in Saudi Arabia.",
  openGraph: {
    title: "Waleed Alhamed",
    description: "Problem Solver · Product Builder · Strategy to Execution",
    url: "https://waleedalghamdi.com",
    siteName: "Waleed Alhamed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed Alhamed",
    description: "Problem Solver · Product Builder · Strategy to Execution",
    creator: "@walalhamed",
  },
}

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 4)

  return (
    <div className="min-h-screen bg-term-black text-term-white font-mono flex flex-col">
      <MinimalNav />
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[url('/noise.png')] animate-noise" />

      <main className="flex-grow pt-24 pb-6">
        <div className="container mx-auto px-4">
          <section className="cli-frame overflow-hidden rounded-lg">
            {/* ── Top Bar ───────────────────────────────────────── */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-term-line px-4 py-3 text-xs uppercase tracking-[0.16em] text-term-gray">
              <div>
                <span className="text-term-green">waok</span> on <LiveClock />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://github.com/wa1939" target="_blank" rel="noopener noreferrer" className="hover:text-term-cyan flex items-center gap-1">
                  <span className="text-term-white font-bold">&lt;/&gt;</span> GitHub
                </a>
                <a href="https://www.linkedin.com/in/waleedalghamdi/" target="_blank" rel="noopener noreferrer" className="hover:text-term-cyan flex items-center gap-1">
                  <span className="text-term-white font-bold">[in]</span> LinkedIn
                </a>
                <Link href="/about" className="hover:text-term-cyan">
                  How I work
                </Link>
              </div>
            </div>

            <div className="space-y-6 p-5 md:p-6">
              {/* ── Hero: TUI Terminal + Portrait ─────────────── */}
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
                {/* Left: Interactive Boot Terminal */}
                <div className="min-h-[320px] md:min-h-[420px]">
                  <BootTerminal />
                </div>

                {/* Right: Portrait + Spotify */}
                <div className="space-y-4">
                  <div className="border border-term-line bg-term-darker rounded-lg overflow-hidden">
                    <div className="relative aspect-[5/4] border-b border-term-line overflow-hidden">
                      <HalftoneImage
                        src="/dbcf93d6-e01e-4308-bea1-11412058a5cd.webp"
                        alt="Waleed Alhamed"
                      />
                    </div>
                    <div className="p-3 text-xs uppercase tracking-[0.14em] text-term-gray bg-term-black">
                      <span className="text-term-white">sys.status:</span> current transmission // consultant, builder, lifelong learner
                    </div>
                  </div>

                  {/* Spotify Widget */}
                  <SpotifyWidget />
                </div>
              </div>

              {/* ── Navigation Links ──────────────────────────── */}
              <AnimateOnScroll>
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-term-line pt-4 text-sm">
                <Link href="/blog" className="text-term-cyan hover:text-term-cyan-bright transition-colors">
                  (01) journal // read the writing
                </Link>
                <Link href="/about" className="text-term-cyan hover:text-term-cyan-bright transition-colors">
                  (02) about // open the dossier
                </Link>
                <Link href="/contact" className="text-term-cyan hover:text-term-cyan-bright transition-colors">
                  (03) contact // book a conversation
                </Link>
              </div>
              </AnimateOnScroll>

              {/* ── NASA APOD — Visual Break ───────────────────── */}
              <AnimateOnScroll delay={80}>
              <ApodWidget />
              </AnimateOnScroll>

              {/* ── Recent Entries (Card Grid) ─────────────────── */}
              <AnimateOnScroll delay={160}>
              <div className="space-y-4">
                <div className="cli-topline">Recent entries</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {posts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group block rounded-xl overflow-hidden border border-[var(--term-line)] hover:border-[var(--term-cyan)] bg-[var(--term-darker)] hover:shadow-lg hover:shadow-[var(--term-cyan)]/5 transition-all duration-300"
                    >
                      {/* Cover */}
                      <div className="aspect-[2.2/1] overflow-hidden bg-[var(--term-black)] relative">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--term-darker)] to-[var(--term-black)]">
                            <div className="text-[var(--term-gray)] opacity-10 text-5xl font-bold select-none">
                              {post.title.charAt(0)}
                            </div>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-[var(--term-black)]/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-[var(--term-gray)]">
                          {post.readingTime} min
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-[var(--term-cyan)]/20 border border-[var(--term-cyan)]/30 px-2 py-0.5 rounded-full text-[10px] text-[var(--term-cyan)]">
                            latest
                          </div>
                        )}
                      </div>
                      {/* Body */}
                      <div className="p-4 space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-[var(--term-line)] text-[var(--term-cyan)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-sm font-semibold text-[var(--term-white)] group-hover:text-[var(--term-cyan)] transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-xs leading-relaxed text-[var(--term-gray)] line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--term-gray)]">
                          <span>{formatPostDate(post.date)}</span>
                          <span className="text-[var(--term-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              </AnimateOnScroll>

              {/* ── Vim-style empty lines ─────────────────────── */}
              <div className="text-term-gray/30 text-sm leading-[1.8] select-none">
                {"~\n~\n~".split("\n").map((_, i) => (
                  <div key={i}>~</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <TerminalFooter />
    </div>
  )
}
