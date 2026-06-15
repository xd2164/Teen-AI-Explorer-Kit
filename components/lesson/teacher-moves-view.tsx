"use client"
import React from "react"
import { TeacherMove } from "@/lib/types"
import { Pencil, Hammer, MessageCircle } from "lucide-react"

interface TeacherMovesViewProps {
  moves: TeacherMove[]
}

const LESSON_FLOW = [
  {
    phase: "d" as const,
    label: "Design — opening (0–8 min)",
    moves: [
      { time: "0–2",   title: "Activate prior knowledge",  body: '"How do you know if it\'s going to rain?" 2–3 responses. Don\'t correct yet.' },
      { time: "2–5",   title: "Frame the big question",    body: "Write the student question where all can see. Don't explain further." },
      { time: "5–8",   title: "Introduce AI connection",   body: '"Today you\'ll build the same kind of rule an AI weather system uses."' },
    ],
  },
  {
    phase: "c" as const,
    label: "Create — card sort (8–38 min)",
    moves: [
      { time: "8–10",  title: "Distribute card sets",  body: "Cards face-down. Groups flip on your signal. 60 s to look before instructions." },
      { time: "10–22", title: "Sort for patterns",     body: 'Circulate. "What pattern do you notice?" If stuck: "Which cards feel most important?"' },
      { time: "22–28", title: "Write forecast rule",   body: 'One if-then statement per group: "If ___, then it will probably rain because ___."' },
      { time: "28–35", title: "Test mystery cards",    body: 'Reveal cards. Before testing: "What would make your rule wrong?"' },
      { time: "35–38", title: "Quick share-out",       body: "Each group shares rule + one failure case. Note variety on the board." },
    ],
  },
  {
    phase: "r" as const,
    label: "Reflect — discussion + exit (38–45 min)",
    moves: [
      { time: "38–42", title: "AI connection + ethics", body: '"How is this similar to training an AI?" Then the neighborhood data-gap prompt.' },
      { time: "42–45", title: "Exit ticket",            body: "Students write 3 answers independently. Collect before dismissal." },
    ],
  },
]

const PHASE_ICON = {
  d: Pencil,
  c: Hammer,
  r: MessageCircle,
}

export function TeacherMovesView({ moves: _moves }: TeacherMovesViewProps) {
  return (
    <div>
      <span className="ws-bkh" style={{ marginTop: 0 }}>Annotated lesson flow — 45 min</span>
      {LESSON_FLOW.map(({ phase, label, moves }) => {
        const Icon = PHASE_ICON[phase]
        return (
          <div key={phase} style={{ marginBottom: "1rem" }}>
            <div className={`ws-mph ${phase}`}>
              <Icon />
              {label}
            </div>
            {moves.map(m => (
              <div key={m.time} className="ws-mrow">
                <span className="ws-mtime">{m.time}</span>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
