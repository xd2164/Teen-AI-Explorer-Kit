import Link from "next/link"
import {
  ArrowRight, Plus, Sparkles, BookOpen, Download,
  X, Check, Pencil, UserX
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] antialiased leading-relaxed">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-3.5 border-b border-black/10 bg-white sticky top-0 z-[100]">
        <Link href="/" className="flex items-center gap-2.5 font-medium text-[15px] text-[#1a1a1a]">
          <div className="w-8 h-8 rounded-lg bg-[#534AB7] flex items-center justify-center flex-shrink-0">
            <Pencil className="w-[15px] h-[15px] text-white" />
          </div>
          Teacher Co-Pilot
        </Link>
        <div className="flex items-center gap-1.5">
          <Link
            href="/library"
            className="text-[13px] text-[#6b6b6b] px-3 py-1.5 rounded-lg border border-transparent hover:bg-[#f7f7f5] hover:text-[#1a1a1a] transition-colors"
          >
            Library
          </Link>
          <Link
            href="/lesson/new"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#534AB7] text-white px-3 py-1.5 rounded-lg border border-[#534AB7] hover:bg-[#3C3489] hover:border-[#3C3489] transition-colors"
          >
            Start planning <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-20 pb-16 px-8 max-w-[700px] mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 text-[12px] font-medium bg-[#EEEDFE] text-[#534AB7] px-3.5 py-1 rounded-full mb-6">
          <Sparkles className="w-3 h-3" />
          Built for K–12 educators
        </div>

        <h1 className="text-[42px] font-medium leading-[1.18] tracking-[-0.5px] mb-5">
          Design, teach, and refine{" "}
          <em className="not-italic text-[#534AB7]">AI literacy lessons</em>
          {" "}— across every subject
        </h1>

        <p className="text-[17px] text-[#6b6b6b] leading-[1.7] max-w-[500px] mx-auto mb-8">
          A memory-enabled planning partner that remembers what worked in your classroom and builds on it every time.
        </p>

        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Link
            href="/lesson/new"
            className="inline-flex items-center gap-1.5 px-[22px] py-2.5 rounded-lg text-[14px] font-medium bg-[#534AB7] text-white border border-[#534AB7] hover:bg-[#3C3489] hover:border-[#3C3489] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Start a new lesson
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 px-[22px] py-2.5 rounded-lg text-[14px] font-medium bg-transparent text-[#1a1a1a] border border-black/[0.15] hover:bg-[#f7f7f5] transition-colors"
          >
            View lesson library
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 mt-7 flex-wrap">
          {[
            { icon: <BookOpen className="w-3 h-3 text-[#534AB7]" />, label: "Works with any K–12 subject" },
            { icon: <UserX className="w-3 h-3 text-[#534AB7]" />, label: "No student AI accounts needed" },
            { icon: <Download className="w-3 h-3 text-[#534AB7]" />, label: "Export to Markdown in one click" },
          ].map(({ icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-[12px] text-[#6b6b6b] border border-black/10 px-3 py-1 rounded-full bg-white">
              {icon}
              {label}
            </span>
          ))}
        </div>
      </section>

      <div className="h-px bg-black/10" />

      {/* ── Design / Create / Reflect ── */}
      <section className="py-14 px-8 max-w-[760px] mx-auto">
        <p className="text-[11px] font-medium tracking-[0.09em] uppercase text-[#534AB7] mb-2.5">How it works</p>
        <h2 className="text-[26px] font-medium mb-2.5">A workflow built around how you actually teach</h2>
        <p className="text-[15px] text-[#6b6b6b] leading-[1.7] max-w-[520px] mb-9">
          Not a one-shot generator — a three-phase partner for the full instructional cycle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              phase: "Phase 1",
              title: "Design",
              desc: "Frame learning goals, surface student questions, connect to standards, and plan the full lesson flow before writing a single activity.",
            },
            {
              phase: "Phase 2",
              title: "Create",
              desc: "Build activities, student steps, teacher moves, and discussion prompts — then revise through natural conversation until it's classroom-ready.",
            },
            {
              phase: "Phase 3",
              title: "Reflect",
              desc: "Save post-lesson insights as reusable memory. Future lessons automatically improve from what you learn about your students.",
            },
          ].map(({ phase, title, desc }) => (
            <div key={phase} className="bg-white border border-black/10 rounded-xl py-5 pr-5 pl-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[#534AB7]" />
              <span className="inline-block text-[11px] font-medium text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded-full mb-3">
                {phase}
              </span>
              <h3 className="text-[16px] font-medium mb-1.5">{title}</h3>
              <p className="text-[13px] text-[#6b6b6b] leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-black/10" />

      {/* ── Compare ── */}
      <section className="py-14 px-8 max-w-[760px] mx-auto">
        <p className="text-[11px] font-medium tracking-[0.09em] uppercase text-[#534AB7] mb-2.5">What makes this different</p>
        <h2 className="text-[26px] font-medium mb-2.5">A planning partner, not a plan printer</h2>
        <p className="text-[15px] text-[#6b6b6b] leading-[1.7] max-w-[520px] mb-9">
          The difference shows up in every interaction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border border-black/10 rounded-xl p-5">
            <h4 className="text-[12px] font-medium tracking-[0.05em] uppercase text-[#9b9b9b] mb-4">Other AI tools</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "One-shot output, no revision",
                "No memory of what worked",
                "Ignores your curriculum context",
                "Generic, not subject-aligned",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.5]">
                  <X className="w-3.5 h-3.5 text-[#9b9b9b] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#AFA9EC] rounded-xl p-5">
            <h4 className="text-[12px] font-medium tracking-[0.05em] uppercase text-[#9b9b9b] mb-4">Teacher Co-Pilot</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "Revise through natural conversation",
                "Saves teaching insights as memory",
                "Uses your curriculum and standards",
                "AI literacy embedded in every subject",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.5]">
                  <Check className="w-3.5 h-3.5 text-[#534AB7] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="h-px bg-black/10" />

      {/* ── Steps ── */}
      <section className="py-14 px-8 max-w-[760px] mx-auto">
        <p className="text-[11px] font-medium tracking-[0.09em] uppercase text-[#534AB7] mb-2.5">Get started</p>
        <h2 className="text-[26px] font-medium mb-2.5">From rough idea to classroom-ready lesson</h2>
        <p className="text-[15px] text-[#6b6b6b] leading-[1.7] max-w-[520px] mb-9">
          Three steps in a single conversation.
        </p>
        <ol className="flex flex-col">
          {[
            {
              num: "1",
              title: "Upload your curriculum or standards",
              desc: "Bring in unit goals, academic standards, school AI policy, or past lesson feedback. The co-pilot retrieves the right context automatically.",
            },
            {
              num: "2",
              title: "Tell the co-pilot what you're planning",
              desc: "Describe the grade level, topic, lesson goal, and student needs. The co-pilot asks only what it needs and generates a first draft.",
            },
            {
              num: "3",
              title: "Revise, teach, and reflect",
              desc: "Improve the lesson through conversation, export when ready, and save post-lesson insights as memory for next time.",
            },
          ].map(({ num, title, desc }, i) => (
            <li key={num} className={`flex gap-5 items-start py-5 ${i < 2 ? "border-b border-black/10" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-[#EEEDFE] text-[#534AB7] flex items-center justify-center text-[13px] font-medium flex-shrink-0">
                {num}
              </div>
              <div>
                <h3 className="text-[15px] font-medium mb-1">{title}</h3>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.6]">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CTA ── */}
      <div className="px-8 pb-14">
        <div className="bg-[#EEEDFE] rounded-xl px-8 py-11 text-center max-w-[760px] mx-auto">
          <h2 className="text-[24px] font-medium mb-3">Ready to design your next AI literacy lesson?</h2>
          <p className="text-[15px] text-[#534AB7] mb-7 leading-[1.7]">
            Start with a standard, a classroom question, or a rough idea.<br />
            The co-pilot turns it into something thoughtful and age-appropriate.
          </p>
          <Link
            href="/lesson/new"
            className="inline-flex items-center gap-1.5 px-[22px] py-2.5 rounded-lg text-[14px] font-medium bg-[#534AB7] text-white border border-[#534AB7] hover:bg-[#3C3489] hover:border-[#3C3489] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Start planning
          </Link>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-black/10 px-8 py-5 flex items-center justify-between text-[12px] text-[#9b9b9b]">
        <span>Teacher Co-Pilot · Design · Create · Reflect</span>
        <span>Built for K–12 educators</span>
      </footer>

    </div>
  )
}
