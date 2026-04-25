import React from 'react'

const MODES = [
  {
    value: 'translate',
    label: 'తెలుగు లోకి మార్చండి',
    desc: 'అర్థం మారకుండా నేరుగా తెలుగులో చదవండి',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    color: 'indigo',
  },
  {
    value: 'simplify',
    label: 'సులభంగా అర్థం చేసుకోండి',
    desc: 'కష్టమైన భాష తెలుగులో సులభంగా',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: 'amber',
  },
  {
    value: 'both',
    label: 'అనువాదం + సులభ వివరణ',
    desc: 'తెలుగులో చదివి, సులభ వివరణ కూడా పొందండి',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    color: 'emerald',
  },
]

const colorMap = {
  indigo: {
    selected: 'border-indigo-400 bg-indigo-50',
    icon: 'bg-indigo-100 text-indigo-600',
    radio: 'border-indigo-400 bg-indigo-500',
    label: 'text-indigo-800',
  },
  amber: {
    selected: 'border-amber-400 bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    radio: 'border-amber-400 bg-amber-500',
    label: 'text-amber-800',
  },
  emerald: {
    selected: 'border-emerald-400 bg-emerald-50',
    icon: 'bg-emerald-100 text-emerald-600',
    radio: 'border-emerald-400 bg-emerald-500',
    label: 'text-emerald-800',
  },
}

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        ఏం చేయాలో ఎంచుకోండి
      </label>
      <div className="space-y-2">
        {MODES.map(({ value, label, desc, icon, color }) => {
          const isSelected = mode === value
          const c = colorMap[color]
          return (
            <label
              key={value}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `${c.selected} border-opacity-100 shadow-sm`
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="mode"
                value={value}
                checked={isSelected}
                onChange={() => onModeChange(value)}
                className="sr-only"
              />
              {/* Custom radio */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected ? `${c.radio} border-transparent` : 'border-gray-300 bg-white'
              }`}>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              {/* Icon */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? c.icon : 'bg-gray-100 text-gray-400'}`}>
                {icon}
              </div>
              {/* Text */}
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${isSelected ? c.label : 'text-gray-700'}`}>{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
