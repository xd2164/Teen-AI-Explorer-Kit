"use client"
import React, { useRef, useEffect, useState } from "react"
import { ChatMessage } from "@/lib/types"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import { QuickCommands } from "./quick-commands"
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react"

interface ChatPanelProps {
  messages: ChatMessage[]
  isGenerating: boolean
  onSendMessage: (content: string) => void
}

export function ChatPanel({ messages, isGenerating, onSendMessage }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [showCommands, setShowCommands] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isGenerating])

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900 leading-tight">Design–Create–Reflect Co-Pilot</h2>
            <p className="text-xs text-gray-500 leading-tight mt-0.5">AI literacy instructional design assistant</p>
          </div>
        </div>
        <button
          onClick={() => setShowCommands(!showCommands)}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Commands
          {showCommands ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Quick commands */}
      {showCommands && (
        <QuickCommands onSelect={(cmd) => { onSendMessage(cmd); setShowCommands(false) }} />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isGenerating && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-5 py-4">
        <ChatInput
          onSend={onSendMessage}
          disabled={isGenerating}
          placeholder="What lesson are you planning? Or ask me to revise, reflect, or create materials..."
        />
        <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
