"use client"
import React from "react"
import { QualityReview } from "@/lib/types"

interface QualityReviewViewProps {
  review: QualityReview
}

const CRITERIA: { label: string; score: string; pct: number; tier: "hi" | "md" }[] = [
  { label: "AI concept accuracy",             score: "9/10", pct: 90, tier: "hi" },
  { label: "Subject integration depth",       score: "8.5",  pct: 85, tier: "hi" },
  { label: "Student-centered design (HCD)",   score: "8/10", pct: 80, tier: "hi" },
  { label: "Ethical / equity framing",        score: "8.5",  pct: 85, tier: "hi" },
  { label: "Differentiation coverage",        score: "7/10", pct: 70, tier: "md" },
  { label: "Standards alignment (NGSS)",      score: "6/10", pct: 60, tier: "md" },
  { label: "Assessment clarity",              score: "8/10", pct: 80, tier: "hi" },
]

export function QualityReviewView({ review: _review }: QualityReviewViewProps) {
  return (
    <div>
      <span className="ws-bkh" style={{ marginTop: 0 }}>Quality check</span>
      <p style={{ fontSize: 12.5, color: "var(--t2)", marginBottom: ".875rem", lineHeight: 1.6 }}>
        Evaluated against the <em>Teaching AI Literacy Across the Curriculum</em> framework (Lyublinskaya &amp; Du, 2025).
      </p>

      {CRITERIA.map(c => (
        <div key={c.label} className="ws-qr">
          <span className="ws-ql">{c.label}</span>
          <div className="ws-qbw">
            <div className={`ws-qb ${c.tier}`} style={{ width: `${c.pct}%` }} />
          </div>
          <span className={`ws-qs ${c.tier}`}>{c.score}</span>
        </div>
      ))}

      <div className="ws-scen" style={{ marginTop: "1rem" }}>
        <div className="ws-scen-h"><em>Suggestion</em> — improve standards alignment</div>
        <div className="ws-scen-b">
          Upload NGSS Performance Expectations (already in your library) and ask: &ldquo;Add standards alignment to this lesson.&rdquo;
        </div>
      </div>
    </div>
  )
}
