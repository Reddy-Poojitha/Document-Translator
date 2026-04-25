import React, { useRef, useState } from 'react'
import { isValidFile, formatFileSize, ALLOWED_EXTENSIONS } from '../utils/helpers'
import AlertMessage from './AlertMessage'

export default function FileUploader({ file, onFileChange }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  function handleFile(f) {
    setError('')
    if (!f) return
    if (!isValidFile(f)) {
      setError(`ఈ ఫైల్ రకం చదవలేం. దయచేసి ${ALLOWED_EXTENSIONS.join(', ')} ఫైల్ పంపండి.`)
      return
    }
    onFileChange(f)
  }

  function onInputChange(e) {
    handleFile(e.target.files[0])
    e.target.value = ''
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  function onDragOver(e) {
    e.preventDefault()
    setDragOver(true)
  }

  function onDragLeave() {
    setDragOver(false)
  }

  const iconForExt = (name) => {
    const ext = name?.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return { color: 'text-red-500', bg: 'bg-red-50', label: 'PDF' }
    if (ext === 'docx') return { color: 'text-blue-500', bg: 'bg-blue-50', label: 'DOCX' }
    return { color: 'text-gray-500', bg: 'bg-gray-100', label: 'TXT' }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        ఫైల్ అప్లోడ్ చేయండి
      </label>

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50 scale-[1.01]'
            : file
            ? 'border-emerald-300 bg-emerald-50 cursor-default'
            : 'border-amber-200 bg-amber-50/30 hover:border-indigo-300 hover:bg-indigo-50/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={onInputChange}
          className="hidden"
        />

        {file ? (
          /* File selected view */
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3 min-w-0">
              {(() => {
                const { color, bg, label } = iconForExt(file.name)
                return (
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xs font-bold font-mono ${color}`}>{label}</span>
                  </div>
                )
              })()}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onFileChange(null)
                setError('')
              }}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
              aria-label="ఫైల్ తొలగించండి"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center gap-3 py-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${dragOver ? 'bg-indigo-100' : 'bg-amber-100'}`}>
              <svg className={`w-6 h-6 ${dragOver ? 'text-indigo-500' : 'text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {dragOver ? 'ఫైల్‌ను ఇక్కడ ఎంచుకోండి' : 'ఫైల్‌ను ఇక్కడ డ్రాప్ చేయండి'}
              </p>
              <p className="text-xs text-gray-400 mt-1">లేదా</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
              className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              ఫైల్ ఎంచుకోండి
            </button>
            <p className="text-xs text-gray-400">PDF, DOCX, TXT ఫైళ్ళు పంపవచ్చు</p>
          </div>
        )}
      </div>

      {error && <AlertMessage type="error" message={error} onDismiss={() => setError('')} />}
    </div>
  )
}
