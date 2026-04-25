import React from 'react'
import LoaderSpinner from './LoaderSpinner'

export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
        disabled || loading
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] hover:shadow-md'
      }`}
    >
      {loading ? (
        <>
          <LoaderSpinner size="sm" />
          <span>తయారవుతోంది…</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          <span>ఫలితం పొందండి</span>
        </>
      )}
    </button>
  )
}
