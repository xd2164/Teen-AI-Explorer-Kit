"use client"
import React, { useState } from "react"
import { LessonDraft } from "@/lib/types"
import { ChevronDown, ChevronRight, AlertTriangle, BookOpen, Brain, Pencil, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonDraftViewProps {
  draft: LessonDraft
}

interface SectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  accent?: "blue" | "green" | "purple" | "amber" | "gray"
  icon?: React.ReactNode
  badge?: string
}

const ACCENT_STYLES = {
  blue:   { header: "bg-blue-600 text-white",      body: "border-blue-200 bg-white",   icon: "bg-blue-100 text-blue-600"   },
  green:  { header: "bg-emerald-600 text-white",   body: "border-emerald-200 bg-white", icon: "bg-emerald-100 text-emerald-600" },
  purple: { header: "bg-violet-600 text-white",    body: "border-violet-200 bg-white", icon: "bg-violet-100 text-violet-600" },
  amber:  { header: "bg-amber-500 text-white",     body: "border-amber-200 bg-white",  icon: "bg-amber-100 text-amber-600"  },
  gray:   { header: "bg-gray-700 text-white",      body: "border-gray-200 bg-white",   icon: "bg-gray-100 text-gray-600"    },
}

function Section({ title, children, defaultOpen = true, accent = "gray", icon, badge }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const styles = ACCENT_STYLES[accent]

  return (
    <div className={cn("rounded-xl border overflow-hidden mb-3", styles.body)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn("w-full flex items-center justify-between px-4 py-3 text-left", styles.header)}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="opacity-90">{icon}</span>}
          <span className="font-semibold text-sm tracking-wide">{title}</span>
          {badge && (
            <span className="text-xs bg-white/25 px-2 py-0.5 rounded-full font-medium">{badge}</span>
          )}
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 opacity-75" />
          : <ChevronRight className="w-4 h-4 opacity-75" />
        }
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{children}</p>
}

function InfoBox({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "warning" | "ethical" }) {
  const styles = {
    default: "bg-gray-50 border border-gray-200 text-gray-700",
    warning: "bg-amber-50 border border-amber-200 text-amber-900",
    ethical: "bg-orange-50 border border-orange-200 text-orange-900",
  }
  return (
    <div className={cn("rounded-lg px-4 py-3 text-sm leading-relaxed", styles[variant])}>
      {children}
    </div>
  )
}

function BulletList({ items, variant = "default" }: { items: string[]; variant?: "default" | "numbered" }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
          {variant === "numbered"
            ? <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">{i + 1}</span>
            : <span className="text-gray-300 mt-1.5 flex-shrink-0 font-bold">·</span>
          }
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LessonDraftView({ draft }: LessonDraftViewProps) {
  return (
    <div className="p-4">
      {/* Big AI Idea banner */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-75 mb-1">Big AI Idea</p>
        <p className="text-sm leading-relaxed font-medium">{draft.bigAiIdea}</p>
      </div>

      {/* Learning Goals */}
      <Section title="Learning Goals" accent="gray" defaultOpen icon={<Brain className="w-4 h-4" />}>
        <div className="space-y-4">
          <div>
            <Label>Subject Goals</Label>
            <div className="space-y-2">
              {draft.subjectLearningGoals.map((g, i) => (
                <div key={i} className="flex items-start gap-3 bg-blue-50 rounded-lg px-4 py-2.5">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-sm text-blue-900 leading-relaxed">{g}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>AI Literacy Goals</Label>
            <div className="space-y-2">
              {draft.aiLiteracyGoals.map((g, i) => (
                <div key={i} className="flex items-start gap-3 bg-violet-50 rounded-lg px-4 py-2.5">
                  <span className="flex-shrink-0 w-5 h-5 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-sm text-violet-900 leading-relaxed">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Design Phase */}
      <Section title="Design Phase" accent="blue" badge="D" icon={<Brain className="w-4 h-4" />}>
        <div className="space-y-4">
          <div>
            <Label>Teacher Goal</Label>
            <InfoBox>{draft.designPhase.teacherGoal}</InfoBox>
          </div>
          <div>
            <Label>Student Question</Label>
            <div className="border-l-4 border-blue-400 pl-4 py-1">
              <p className="text-sm text-gray-700 italic leading-relaxed">"{draft.designPhase.studentQuestion}"</p>
            </div>
          </div>
          <div>
            <Label>Misconceptions to Surface</Label>
            <BulletList items={draft.designPhase.misconceptionsToSurface} />
          </div>
        </div>
      </Section>

      {/* Create Phase */}
      <Section title="Create Phase" accent="green" badge="C" icon={<Pencil className="w-4 h-4" />}>
        <div className="space-y-4">
          <div>
            <Label>Activity Overview</Label>
            <InfoBox>{draft.createPhase.activityOverview}</InfoBox>
          </div>
          <div>
            <Label>Student Steps</Label>
            <BulletList items={draft.createPhase.studentSteps} variant="numbered" />
          </div>
          <div>
            <Label>Teacher Moves</Label>
            <BulletList items={draft.createPhase.teacherMoves} />
          </div>
          <div>
            <Label>Materials</Label>
            <BulletList items={draft.createPhase.materials} />
          </div>
        </div>
      </Section>

      {/* Reflect Phase */}
      <Section title="Reflect Phase" accent="purple" badge="R" icon={<RefreshCw className="w-4 h-4" />}>
        <div className="space-y-4">
          <div>
            <Label>Discussion Prompts</Label>
            <div className="space-y-2">
              {draft.reflectPhase.discussionPrompts.map((prompt, i) => (
                <div key={i} className="border-l-4 border-violet-300 pl-4 py-1">
                  <p className="text-sm text-gray-700 italic leading-relaxed">"{prompt}"</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Ethical Reflection</Label>
            <InfoBox variant="ethical">{draft.reflectPhase.ethicalReflection}</InfoBox>
          </div>
          <div>
            <Label>Exit Ticket</Label>
            <InfoBox>{draft.reflectPhase.exitTicket}</InfoBox>
          </div>
        </div>
      </Section>

      {/* Differentiation */}
      <Section title="Differentiation" accent="amber" defaultOpen={false} icon={<Brain className="w-4 h-4" />}>
        <div className="space-y-4">
          <div>
            <Label>Multilingual Learners</Label>
            <BulletList items={draft.differentiation.multilingualLearners} />
          </div>
          <div>
            <Label>Students Needing Support</Label>
            <BulletList items={draft.differentiation.studentsNeedingSupport} />
          </div>
          <div>
            <Label>Extension</Label>
            <BulletList items={draft.differentiation.extension} />
          </div>
        </div>
      </Section>

      {/* Teacher Decision Points */}
      <Section title="Teacher Decisions Needed" accent="amber" defaultOpen={false}>
        <ul className="space-y-3">
          {draft.teacherDecisionPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-amber-900 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Sources Used */}
      <Section title="Sources Used" accent="gray" defaultOpen={false}>
        <ul className="space-y-2">
          {draft.sourceUseSummary.map((source, i) => (
            <li key={i} className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 leading-relaxed">{source}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Rationale */}
      <Section title="Why This Lesson?" accent="gray" defaultOpen={false}>
        <div className="space-y-4">
          {[
            { label: "Why this activity", value: draft.rationale.whyThisActivity },
            { label: "Why this AI connection", value: draft.rationale.whyThisAiConnection },
            { label: "Why this assessment", value: draft.rationale.whyThisAssessment },
          ].map(({ label, value }) => (
            <div key={label}>
              <Label>{label}</Label>
              <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
