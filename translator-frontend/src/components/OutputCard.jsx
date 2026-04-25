import React from 'react'
import AudioPlayer from './AudioPlayer'

const accentMap = {
  indigo: {
    border: 'border-indigo-200',
    bg: 'bg-indigo-50/50',
    badge: 'bg-indigo-100 text-indigo-700',
    dot: 'bg-indigo-400',
  },
  emerald: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/50',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-400',
  },
  amber: {
    border: 'border-amber-200',
    bg: 'bg-amber-50/50',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-400',
  },
}

export default function OutputCard({ title, text, audioSrc, audioLoading, accent = 'indigo' }) {
  const c = accentMap[accent] || accentMap.indigo

  return (
    <div className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5 space-y-4 animate-fade-up`}>
      {/* Card header — no domain badge shown (domain is internal, not for users) */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        <h3 className="font-display font-semibold text-gray-800 text-lg leading-tight">
          {title}
        </h3>
      </div>

      {/* Telugu text — white-space:pre-wrap preserves all line breaks and lists */}
      <div className="bg-white/70 rounded-xl p-4 border border-white shadow-sm">
        <pre
          className="text-sm text-gray-800 leading-relaxed break-words font-body"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit' }}
        >
          {text}
        </pre>
      </div>

      {/* Audio player */}
      <AudioPlayer
        audioSrc={audioSrc}
        loading={audioLoading}
        label={title}
      />
    </div>
  )
}
