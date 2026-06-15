"use client"
import React, { useRef } from "react"
import { KnowledgeDocument } from "@/lib/types"
import { sourceTypeLabel } from "@/lib/utils"
import { BookOpen, FileText, Shield, GraduationCap, Plus, CheckCircle2, Clock, AlertCircle, EyeOff } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { cn } from "@/lib/utils"

interface KnowledgeLibraryProps {
  documents: KnowledgeDocument[]
  onUpload: (doc: KnowledgeDocument) => void
  onToggle: (docId: string) => void
}

const SOURCE_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  curriculum_map:       { icon: <BookOpen className="w-3.5 h-3.5" />,      color: "text-blue-600",   bg: "bg-blue-50"   },
  prior_feedback:       { icon: <FileText className="w-3.5 h-3.5" />,      color: "text-amber-600",  bg: "bg-amber-50"  },
  policy:               { icon: <Shield className="w-3.5 h-3.5" />,        color: "text-red-600",    bg: "bg-red-50"    },
  standard:             { icon: <GraduationCap className="w-3.5 h-3.5" />, color: "text-green-600",  bg: "bg-green-50"  },
  ai_literacy_framework:{ icon: <GraduationCap className="w-3.5 h-3.5" />, color: "text-purple-600", bg: "bg-purple-50" },
  lesson_plan:          { icon: <FileText className="w-3.5 h-3.5" />,      color: "text-indigo-600", bg: "bg-indigo-50" },
  reflection:           { icon: <FileText className="w-3.5 h-3.5" />,      color: "text-pink-600",   bg: "bg-pink-50"   },
  student_work:         { icon: <FileText className="w-3.5 h-3.5" />,      color: "text-teal-600",   bg: "bg-teal-50"   },
}

function StatusChip({ status }: { status: string }) {
  if (status === "ready")
    return (
      <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
        <CheckCircle2 className="w-3 h-3" /> Ready
      </span>
    )
  if (status === "processing")
    return (
      <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
        <Clock className="w-3 h-3 animate-spin" /> Processing
      </span>
    )
  if (status === "needs_review")
    return (
      <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
        <AlertCircle className="w-3 h-3" /> Review needed
      </span>
    )
  return <span className="text-xs text-gray-400">Uploading…</span>
}

function DocumentItem({ doc, onToggle }: { doc: KnowledgeDocument; onToggle: (id: string) => void }) {
  const cfg = SOURCE_CONFIG[doc.sourceType] || { icon: <FileText className="w-3.5 h-3.5" />, color: "text-gray-600", bg: "bg-gray-50" }

  return (
    <div className={cn(
      "group flex items-start gap-3 rounded-xl px-3 py-2.5 mb-1.5 border transition-colors cursor-default",
      doc.usedInCurrentLesson
        ? "bg-blue-50 border-blue-200"
        : "bg-white border-gray-100 hover:border-gray-200",
      !doc.includeInSearch && "opacity-50"
    )}>
      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", cfg.bg, cfg.color)}>
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug truncate">{doc.fileName}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sourceTypeLabel(doc.sourceType)}</p>
        <div className="mt-1">
          <StatusChip status={doc.status} />
        </div>
      </div>
      <button
        onClick={() => onToggle(doc.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 text-gray-400 hover:text-gray-600"
        title={doc.includeInSearch ? "Exclude from retrieval" : "Include in retrieval"}
      >
        <EyeOff className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function guessSourceType(fileName: string): KnowledgeDocument["sourceType"] {
  const lower = fileName.toLowerCase()
  if (lower.includes("curriculum") || lower.includes("scope")) return "curriculum_map"
  if (lower.includes("feedback") || lower.includes("review")) return "prior_feedback"
  if (lower.includes("policy") || lower.includes("guideline")) return "policy"
  if (lower.includes("standard") || lower.includes("ngss") || lower.includes("ccss")) return "standard"
  if (lower.includes("ai") || lower.includes("literacy") || lower.includes("framework")) return "ai_literacy_framework"
  if (lower.includes("reflection") || lower.includes("notes")) return "reflection"
  return "lesson_plan"
}

export function KnowledgeLibrary({ documents, onUpload, onToggle }: KnowledgeLibraryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const newDoc: KnowledgeDocument = {
        id: uuidv4(),
        fileName: file.name,
        sourceType: guessSourceType(file.name),
        status: "processing",
        trustLevel: "medium",
        includeInSearch: true,
      }
      onUpload(newDoc)
      setTimeout(() => onUpload({ ...newDoc, status: "ready" }), 2000)
    })
    e.target.value = ""
  }

  const usedDocs = documents.filter(d => d.usedInCurrentLesson)
  const unusedDocs = documents.filter(d => !d.usedInCurrentLesson)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-sm font-semibold text-gray-900">Knowledge Library</h2>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">Upload curriculum, standards, and policy docs</p>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3">
        {usedDocs.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider px-1 mb-2">
              Used in this lesson
            </p>
            {usedDocs.map(doc => (
              <DocumentItem key={doc.id} doc={doc} onToggle={onToggle} />
            ))}
          </div>
        )}

        {unusedDocs.length > 0 && (
          <div>
            {usedDocs.length > 0 && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
                Available
              </p>
            )}
            {unusedDocs.map(doc => (
              <DocumentItem key={doc.id} doc={doc} onToggle={onToggle} />
            ))}
          </div>
        )}

        {documents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">No resources yet</p>
            <p className="text-xs text-gray-400 leading-relaxed">Upload your curriculum map, standards, or AI policy to get context-aware lessons.</p>
          </div>
        )}
      </div>

      {/* Add button */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.md"
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
        <p className="text-xs text-gray-400 text-center mt-1.5">PDF, DOCX, or TXT</p>
      </div>
    </div>
  )
}
