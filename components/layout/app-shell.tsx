"use client"
import React, { useState } from "react"
import Link from "next/link"
import { KnowledgeLibrary } from "@/components/knowledge-library/knowledge-library"
import { ChatPanel } from "@/components/chat/chat-panel"
import { LessonDraftPanel } from "@/components/lesson/lesson-draft-panel"
import { DEMO_DOCUMENTS, DEMO_LESSON, DEMO_INITIAL_MESSAGES, DEMO_TEACHER_MOVES, DEMO_REVISIONS, DEMO_QUALITY_REVIEW } from "@/lib/demo-data"
import { ChatMessage, LessonDraft, KnowledgeDocument } from "@/lib/types"
import { getDemoResponse } from "@/lib/demo-responses"
import { BookOpen, Sparkles, ArrowLeft } from "lucide-react"

export function AppShell() {
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_INITIAL_MESSAGES)
  const [currentDraft, setCurrentDraft] = useState<LessonDraft>(DEMO_LESSON)
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(DEMO_DOCUMENTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView] = useState<"draft" | "teacher-moves" | "timeline" | "design-space" | "quality">("draft")

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600))

    const demoReply = getDemoResponse(content, currentDraft)

    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      content: demoReply.message,
      timestamp: new Date(),
      stage: demoReply.stage,
      retrievalSummary: demoReply.retrievalSummary,
    }
    setMessages(prev => [...prev, assistantMessage])

    if (demoReply.updatedDraft) {
      setCurrentDraft(demoReply.updatedDraft)
    }

    setIsGenerating(false)
  }

  const handleDocumentUpload = (doc: KnowledgeDocument) => {
    setDocuments(prev => {
      const existing = prev.find(d => d.id === doc.id)
      if (existing) return prev.map(d => d.id === doc.id ? doc : d)
      return [...prev, doc]
    })
  }

  const handleToggleDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(d => d.id === docId ? { ...d, includeInSearch: !d.includeInSearch } : d)
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top nav */}
      <header className="flex-shrink-0 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
          <span className="text-gray-200 text-lg">·</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Design–Create–Reflect Co-Pilot</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/library" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <BookOpen className="w-4 h-4" />
            Library
          </Link>
          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-medium">Demo</span>
        </div>
      </header>

      {/* Three-column workspace */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Knowledge Library */}
        <div className="w-72 flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
          <KnowledgeLibrary
            documents={documents}
            onUpload={handleDocumentUpload}
            onToggle={handleToggleDocument}
          />
        </div>

        {/* Center: Chat */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-gray-200">
          <ChatPanel
            messages={messages}
            isGenerating={isGenerating}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right: Lesson Draft */}
        <div className="w-[460px] flex-shrink-0 bg-white overflow-hidden flex flex-col">
          <LessonDraftPanel
            draft={currentDraft}
            teacherMoves={DEMO_TEACHER_MOVES}
            revisions={DEMO_REVISIONS}
            qualityReview={DEMO_QUALITY_REVIEW}
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>
      </div>
    </div>
  )
}
