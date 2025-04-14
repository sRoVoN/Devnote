"use client"
import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

