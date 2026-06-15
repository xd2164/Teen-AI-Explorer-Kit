"use client"
import React from "react"
import { ChatMessage } from "@/lib/types"
import { Sparkles, User, Database } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageBubbleProps {
  message: ChatMessage
}

const STAGE_LABELS: Record<string, { label: string; color: string }> = {
  understand: { label: "Understanding", color: "bg-gray-100 text-gray-600" },
  retrieve:   { label: "Retrieving context", color: "bg-blue-100 text-blue-700" },
  generate:   { label: "Generating lesson", color: "bg-green-100 text-green-700" },
  revise:     { label: "Revising", color: "bg-amber-100 text-amber-700" },
  reflect:    { label: "Reflecting", color: "bg-purple-100 text-purple-700" },
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant"
  const stage = message.stage ? STAGE_LABELS[message.stage] : null

  return (
    <div className={cn("flex items-start gap-3", !isAssistant && "flex-row-reverse")}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm",
        isAssistant ? "bg-blue-600" : "bg-gray-700"
      )}>
        {isAssistant
          ? <Sparkles className="w-4 h-4 text-white" />
          : <User className="w-4 h-4 text-white" />
        }
      </div>

      <div className={cn("max-w-[85%] space-y-2", !isAssistant && "items-end flex flex-col")}>
        {/* Stage pill */}
        {isAssistant && stage && (
          <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", stage.color)}>
            {stage.label}
          </span>
        )}

        {/* Retrieval summary */}
        {isAssistant && message.retrievalSummary && message.retrievalSummary.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-2">
              <Database className="w-3.5 h-3.5" />
              Context pulled from your materials
            </div>
            <ul className="space-y-1">
              {message.retrievalSummary.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bubble */}
        <div className={cn(
          "rounded-2xl px-5 py-4 shadow-sm",
          isAssistant
            ? "bg-white border border-gray-200 rounded-tl-sm text-gray-800"
            : "bg-blue-600 text-white rounded-tr-sm"
        )}>
          {isAssistant ? (
            <div className="prose prose-sm max-w-none text-gray-800
              prose-p:my-1.5 prose-p:leading-relaxed
              prose-li:my-0.5 prose-li:leading-relaxed
              prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1.5
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm
              prose-hr:border-gray-200 prose-hr:my-3
              prose-blockquote:border-blue-300 prose-blockquote:text-gray-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Timestamp */}
        <p className={cn("text-xs text-gray-400 px-1", !isAssistant && "text-right")}>
          {formatDate(message.timestamp)}
        </p>
      </div>
    </div>
  )
}
