"use client"
import React from "react"
import { DraftRevision } from "@/lib/types"

interface DraftTimelineViewProps {
  revisions: DraftRevision[]
}

const REVISION_DETAIL: Record<number, string> = {
  3: "Physical card sort, sentence frames, bilingual pair discussion for ELL students.",
  2: "Three misconceptions surfaced. Neighborhood data-gap prompt added.",
  1: "Generated from curriculum map, prior feedback, and school AI policy.",
}

const REVISION_TITLE: Record<number, string> = {
  3: "Hands-on card sort + multilingual supports",
  2: "Added misconceptions + ethical reflection",
  1: "First draft",
}

const REVISION_TIME: Record<number, string> = {
  3: "Jan 15, 10:16 AM",
  2: "Jan 15, 9:45 AM",
  1: "Jan 15, 9:02 AM",
}

export function DraftTimelineView({ revisions }: DraftTimelineViewProps) {
  const sorted = [...revisions].sort((a, b) => b.versionNumber - a.versionNumber)
  const maxVer = sorted[0]?.versionNumber ?? 3

  return (
    <div>
      <span className="ws-bkh" style={{ marginTop: 0 }}>Revision history</span>
      {sorted.map(rev => {
        const isCurrent = rev.versionNumber === maxVer
        const title  = REVISION_TITLE[rev.versionNumber] ?? rev.summary
        const detail = REVISION_DETAIL[rev.versionNumber] ?? rev.whatChanged.join(" · ")
        const time   = REVISION_TIME[rev.versionNumber] ?? rev.timestamp.toLocaleString()

        return (
          <div key={rev.versionNumber} className="ws-hi">
            <span className={`ws-hdot${isCurrent ? " c" : ""}`} />
            <div style={{ width: 22, flexShrink: 0 }}>
              <span
                className="ws-hv"
                style={isCurrent ? { color: "var(--tl)" } : undefined}
              >
                v{rev.versionNumber}
              </span>
            </div>
            <div>
              <h4>
                {title}
                {isCurrent && (
                  <span className="ws-bdg tl" style={{ fontSize: 9, marginLeft: 4 }}>Current</span>
                )}
              </h4>
              <p>{detail}</p>
              <div className="ws-ht">
                {time}
                {!isCurrent && (
                  <> · <span className="ws-rst">Restore</span></>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
