import Link from "next/link"
import { Brain, Pencil, RefreshCw, ArrowRight, Upload, MessageSquare, Lightbulb, BookOpen, Sparkles, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">Teacher Co-Pilot</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/library" className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Library
            </Link>
            <Link
              href="/lesson/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Planning
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            Design · Create · Reflect
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Teacher Co-Pilot<br />
            <span className="text-blue-600">for AI Literacy</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A memory-enabled planning partner that helps K–12 teachers design, teach,
            and improve AI literacy lessons — across every subject.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/lesson/new"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white rounded-2xl font-semibold text-base hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Start a New Lesson
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              View Lesson Library
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            {["Works with any K–12 subject", "No student AI accounts needed", "Export to Markdown in one click"].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ── DCR Cards ───────────────────────────────────────────────── */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="group bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-200 transition-colors">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-3 border border-blue-100">
                Phase 1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Design</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Frame the learning goal, surface student questions, connect to standards, and plan the full lesson flow before writing a single activity.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-200 transition-colors">
                <Pencil className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold mb-3 border border-emerald-100">
                Phase 2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Create</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Build activities, student steps, teacher moves, discussion prompts, and classroom materials — then revise through natural conversation.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-violet-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-violet-200 transition-colors">
                <RefreshCw className="w-6 h-6 text-violet-600" />
              </div>
              <div className="inline-flex items-center px-2.5 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-semibold mb-3 border border-violet-100">
                Phase 3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reflect</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Save post-lesson insights as reusable memory. Future lessons improve from what you learn about your students and your teaching.
              </p>
            </div>

          </div>
        </section>

        {/* ── Comparison ──────────────────────────────────────────────── */}
        <section className="pb-20">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 pt-8 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">What makes this different</h2>
              <p className="text-slate-500 text-base">This is not a lesson-plan generator. It's a planning partner.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="px-8 py-8 bg-slate-50/50">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-5">
                  Not this
                </div>
                <p className="text-lg text-slate-500 italic leading-relaxed">
                  "A chatbot that writes lesson plans for teachers."
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "One-shot output, no revision",
                    "No memory of what worked",
                    "Ignores your curriculum context",
                    "Generic, not subject-aligned",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs flex-shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 py-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-5">
                  This
                </div>
                <p className="text-lg text-slate-800 font-medium leading-relaxed">
                  "A planning partner that supports the full instructional design process — planning, creating, teaching, reflecting, and reusing knowledge over time."
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Revise through natural conversation",
                    "Saves teaching insights as memory",
                    "Uses your curriculum and standards",
                    "AI literacy embedded in every subject",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Steps ───────────────────────────────────────────────────── */}
        <section className="pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Get started in 3 steps</h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto">From rough idea to classroom-ready lesson in a single conversation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 to-blue-200 -z-0" />

            {[
              {
                step: "1",
                icon: <Upload className="w-5 h-5 text-blue-600" />,
                iconBg: "bg-blue-100",
                title: "Upload your curriculum or standards",
                desc: "Bring in your unit goals, academic standards, school AI policy, or past lesson feedback. The co-pilot retrieves the right context automatically.",
              },
              {
                step: "2",
                icon: <MessageSquare className="w-5 h-5 text-violet-600" />,
                iconBg: "bg-violet-100",
                title: "Tell the co-pilot what you are planning",
                desc: "Describe the grade level, topic, lesson goal, and student needs. The co-pilot asks only what it needs and generates a first draft.",
              },
              {
                step: "3",
                icon: <Lightbulb className="w-5 h-5 text-emerald-600" />,
                iconBg: "bg-emerald-100",
                title: "Revise, teach, and reflect",
                desc: "Improve the lesson through conversation, export when ready, and save post-lesson insights as reusable memory for next time.",
              },
            ].map(({ step, icon, iconBg, title, desc }) => (
              <div key={step} className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center`}>
                    {icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-sm">
                    {step}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────────────── */}
        <section className="pb-20">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl px-10 py-14 text-center shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Ready when you are
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                Ready to design your next<br />AI literacy lesson?
              </h2>
              <p className="text-blue-100 text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Start with a standard, a classroom question, or a rough idea.
                The co-pilot will help you turn it into a thoughtful, age-appropriate
                AI literacy lesson — with your curriculum context already built in.
              </p>
              <Link
                href="/lesson/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Planning
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="pb-10 text-center">
          <p className="text-sm text-slate-400">
            Design · Create · Reflect &nbsp;·&nbsp; Built for K–12 educators
          </p>
        </footer>

      </div>
    </main>
  )
}
