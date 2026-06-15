"use client"
import React from "react"
import { LessonDraft } from "@/lib/types"
import { Lightbulb, GitBranch, AlertTriangle } from "lucide-react"

interface DesignSpaceViewProps {
  draft: LessonDraft
}

const DESIGN_ITEMS: { dsiClass: "id" | "al" | "wn"; icon: React.ReactNode; title: string; body: string }[] = [
  {
    dsiClass: "id",
    icon: <Lightbulb />,
    title: "Simulated AI demo",
    body: "Show a decision-tree visualization alongside the card sort. One teacher device needed.",
  },
  {
    dsiClass: "al",
    icon: <GitBranch />,
    title: "Alternative: pencil-and-paper table",
    body: "Lower prep. Loses physical manipulation but easier to run without setup time.",
  },
  {
    dsiClass: "id",
    icon: <Lightbulb />,
    title: "Extension: compare two AI systems",
    body: "Groups test rules from urban vs. rural datasets. Which AI is more reliable?",
  },
  {
    dsiClass: "wn",
    icon: <AlertTriangle />,
    title: "Tension: equity prompt timing",
    body: "Mid-activity raises stakes but may derail the sort. Current closing placement is safer.",
  },
]

export function DesignSpaceView({ draft: _draft }: DesignSpaceViewProps) {
  return (
    <div>
      <span className="ws-bkh" style={{ marginTop: 0 }}>Design alternatives &amp; tensions</span>
      <p style={{ fontSize: 12.5, color: "var(--t2)", marginBottom: ".875rem", lineHeight: 1.6 }}>
        Ideas considered — ask the co-pilot to build any of these out.
      </p>
      {DESIGN_ITEMS.map(item => (
        <div key={item.title} className="ws-dsr">
          <div className={`ws-dsi ${item.dsiClass}`}>{item.icon}</div>
          <div>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
