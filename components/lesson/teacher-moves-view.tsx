"use client"
import React, { useState } from "react"
import { TeacherMove } from "@/lib/types"
import { cn } from "@/lib/utils"
import { HelpCircle, AlertCircle, MessageSquare, Users, CheckSquare, Zap, RefreshCw, ChevronDown, ChevronRight } from "lucide-react"

interface TeacherMovesViewProps {
  moves: TeacherMove[]
}

const MOVE_CONFIG: Record<string, { icon: React.ReactNode; color: string; border: string; bg: string }> = {
  guiding_question:   { icon: <HelpCircle className="w-4 h-4" />,    color: "text-blue-700",   border: "border-blue-200",   bg: "bg-blue-50"   },
  misconception_probe:{ icon: <AlertCircle className="w-4 h-4" />,   color: "text-amber-700",  border: "border-amber-200",  bg: "bg-amber-50"  },
  think_aloud:        { icon: <MessageSquare className="w-4 h-4" />, color: "text-indigo-700", border: "border-indigo-200", bg: "bg-indigo-50" },
  pair_discussion:    { icon: <Users className="w-4 h-4" />,         color: "text-green-700",  border: "border-green-200",  bg: "bg-green-50"  },
  evidence_check:     { icon: <CheckSquare className="w-4 h-4" />,   color: "text-teal-700",   border: "border-teal-200",   bg: "bg-teal-50"   },
  ethical_dilemma:    { icon: <Zap className="w-4 h-4" />,           color: "text-purple-700", border: "border-purple-200", bg: "bg-purple-50" },
  student_reflection: { icon: <RefreshCw className="w-4 h-4" />,     color: "text-pink-700",   border: "border-pink-200",   bg: "bg-pink-50"   },
}

export function TeacherMovesView({ moves }: TeacherMovesViewProps) {
  const [expanded, setExpanded] = useState<string | null>(moves[0]?.type || null)

  return (
    <div className="p-4 space-y-3">
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-2">
        <p className="text-sm text-blue-800 leading-relaxed">
          These moves support you during instruction — use them to guide thinking, surface misconceptions, and deepen engagement.
        </p>
      </div>

      {moves.map((move) => {
        const isOpen = expanded === move.type
        const cfg = MOVE_CONFIG[move.type] || { icon: <HelpCircle className="w-4 h-4" />, color: "text-gray-700", border: "border-gray-200", bg: "bg-gray-50" }

        return (
          <div key={move.type} className={cn("border rounded-xl overflow-hidden bg-white", cfg.border)}>
            <button
              onClick={() => setExpanded(isOpen ? null : move.type)}
              className={cn("w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors")}
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", cfg.bg, cfg.color)}>
                {cfg.icon}
              </div>
              <span className={cn("text-sm font-semibold flex-1", cfg.color)}>{move.label}</span>
              {isOpen
                ? <ChevronDown className="w-4 h-4 text-gray-400" />
                : <ChevronRight className="w-4 h-4 text-gray-400" />
              }
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                <div className="pt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">When to use it</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{move.whenToUse}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">What to say</p>
                  <div className="border-l-4 border-gray-300 pl-4 py-1">
                    <p className="text-sm text-gray-800 italic leading-relaxed">"{move.whatToSay}"</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Why it helps</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{move.whyItHelps}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
