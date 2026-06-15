"use client"
import React, { useState } from "react"
import { LessonDraft, TeacherMove, DraftRevision, QualityReview } from "@/lib/types"
import { LessonDraftView } from "./lesson-draft-view"
import { TeacherMovesView } from "./teacher-moves-view"
import { DraftTimelineView } from "./draft-timeline-view"
import { DesignSpaceView } from "./design-space-view"
import { QualityReviewView } from "./quality-review-view"
import { readinessColor } from "@/lib/utils"
import { Download, Copy, FileText, Zap, Clock, Map, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type ActiveView = "draft" | "teacher-moves" | "timeline" | "design-space" | "quality"

interface LessonDraftPanelProps {
  draft: LessonDraft
  teacherMoves: TeacherMove[]
  revisions: DraftRevision[]
  qualityReview: QualityReview
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
}

const TABS = [
  { id: "draft" as ActiveView,        icon: FileText,    label: "Lesson"        },
  { id: "teacher-moves" as ActiveView, icon: Zap,        label: "Moves"         },
  { id: "timeline" as ActiveView,      icon: Clock,      label: "History"       },
  { id: "design-space" as ActiveView,  icon: Map,        label: "Design Space"  },
  { id: "quality" as ActiveView,       icon: ShieldCheck, label: "Quality"      },
]

export function LessonDraftPanel({
  draft, teacherMoves, revisions, qualityReview, activeView, onViewChange,
}: LessonDraftPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleExportMarkdown = () => {
    const md = generateMarkdown(draft)
    const blob = new Blob([md], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${draft.lessonTitle.replace(/\s+/g, "-")}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateMarkdown(draft))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Lesson header */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-gray-900 leading-snug">
              {draft.lessonTitle || "Lesson Draft"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {draft.gradeLevel} · {draft.subject} · {draft.duration}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={cn("text-xs px-2.5 py-1 rounded-full border font-semibold", readinessColor(qualityReview.readiness))}>
              {qualityReview.readiness === "ready" ? "Ready" : qualityReview.readiness === "needs_revision" ? "Review" : "Not Ready"}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
              v{draft.versionNumber}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                activeView === id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* View content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-gray-50">
        {activeView === "draft" && <LessonDraftView draft={draft} />}
        {activeView === "teacher-moves" && <TeacherMovesView moves={teacherMoves} />}
        {activeView === "timeline" && <DraftTimelineView revisions={revisions} />}
        {activeView === "design-space" && <DesignSpaceView draft={draft} />}
        {activeView === "quality" && <QualityReviewView review={qualityReview} />}
      </div>

      {/* Export footer */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex gap-2">
        <button
          onClick={handleExportMarkdown}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export .md
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

function generateMarkdown(draft: LessonDraft): string {
  return `# ${draft.lessonTitle}

**Grade:** ${draft.gradeLevel} | **Subject:** ${draft.subject} | **Duration:** ${draft.duration}

## Learning Goals

**Subject Learning Goals:**
${draft.subjectLearningGoals.map(g => `- ${g}`).join("\n")}

**AI Literacy Goals:**
${draft.aiLiteracyGoals.map(g => `- ${g}`).join("\n")}

**Big AI Idea:** ${draft.bigAiIdea}

---

## Design Phase

**Teacher Goal:** ${draft.designPhase.teacherGoal}

**Student Question:** ${draft.designPhase.studentQuestion}

**Prior Knowledge:** ${draft.designPhase.priorKnowledge}

**Activity:** ${draft.designPhase.activity}

**Misconceptions to Surface:**
${draft.designPhase.misconceptionsToSurface.map(m => `- ${m}`).join("\n")}

---

## Create Phase

**Activity Overview:** ${draft.createPhase.activityOverview}

**Student Steps:**
${draft.createPhase.studentSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Teacher Moves:**
${draft.createPhase.teacherMoves.map(m => `- ${m}`).join("\n")}

**Materials:**
${draft.createPhase.materials.map(m => `- ${m}`).join("\n")}

---

## Reflect Phase

**Discussion Prompts:**
${draft.reflectPhase.discussionPrompts.map(p => `- ${p}`).join("\n")}

**Ethical Reflection:** ${draft.reflectPhase.ethicalReflection}

**Exit Ticket:** ${draft.reflectPhase.exitTicket}

---

## Differentiation

**Multilingual Learners:**
${draft.differentiation.multilingualLearners.map(s => `- ${s}`).join("\n")}

**Students Needing Support:**
${draft.differentiation.studentsNeedingSupport.map(s => `- ${s}`).join("\n")}

**Extension:**
${draft.differentiation.extension.map(s => `- ${s}`).join("\n")}

---

## Teacher Decision Points

${draft.teacherDecisionPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

---

## Rationale

**Why this activity:** ${draft.rationale.whyThisActivity}

**Why this AI connection:** ${draft.rationale.whyThisAiConnection}

**Why this assessment:** ${draft.rationale.whyThisAssessment}
`
}
