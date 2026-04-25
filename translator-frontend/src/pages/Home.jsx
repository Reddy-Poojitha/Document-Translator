import React, { useState, useRef, useCallback } from 'react'
import FileUploader from '../components/FileUploader'
import ModeSelector from '../components/ModeSelector'
import GenerateButton from '../components/GenerateButton'
import OutputCard from '../components/OutputCard'
import AlertMessage from '../components/AlertMessage'
import { translateDocument, generateAudio } from '../services/api'
import { useTranslator } from '../context/TranslatorContext'

// Steps section — simple conversational Telugu labels
const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    label: 'ఫైల్ అప్లోడ్ చేయండి',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    label: 'మోడ్ ఎంచుకోండి',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    label: 'తెలుగులో చదవండి',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    label: 'ఆడియో వినండి',
    color: 'bg-rose-100 text-rose-600',
  },
]

export default function Home() {
  // File object is local state — cannot be stored in Context (not serialisable)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const outputRef = useRef(null)

  // All output persists in Context across page navigation
  const {
    mode, setMode,
    setFileName,
    result, setResult,
    translationAudio, setTranslationAudio,
    explanationAudio, setExplanationAudio,
    translationAudioLoading, setTranslationAudioLoading,
    explanationAudioLoading, setExplanationAudioLoading,
    clearResult,
  } = useTranslator()

  // When user selects a new file, clear previous output
  function handleFileChange(f) {
    setFile(f)
    if (f) {
      setFileName(f.name)
    } else {
      setFileName('')
      clearResult()
    }
  }

  // Runs in background after text output is shown — stores audio in Context.
  // Handles all three modes correctly:
  //   translate  → audio for translated_text only
  //   simplify   → audio for translated_text (which contains the simplified text)
  //   both       → audio for translated_text AND explanation_text separately
  const startAudioGeneration = useCallback(async (translatedText, explanationText) => {
    // Always generate audio for the main output text
    setTranslationAudioLoading(true)
    try {
      const src = await generateAudio(translatedText)
      setTranslationAudio(src)
    } catch (err) {
      console.error('Translation audio error:', err)
    } finally {
      setTranslationAudioLoading(false)
    }

    // Generate second audio only when mode=both and explanation text exists
    if (explanationText) {
      setExplanationAudioLoading(true)
      try {
        const src = await generateAudio(explanationText)
        setExplanationAudio(src)
      } catch (err) {
        console.error('Explanation audio error:', err)
      } finally {
        setExplanationAudioLoading(false)
      }
    }
  }, [setTranslationAudio, setExplanationAudio, setTranslationAudioLoading, setExplanationAudioLoading])

  async function handleGenerate() {
    if (!file) {
      setError('ముందు ఒక ఫైల్ అప్లోడ్ చేయండి.')
      return
    }
    setError('')
    clearResult()
    setLoading(true)

    try {
      const data = await translateDocument(file, mode)

      if (data.error) {
        setError(data.error)
        return
      }

      // Persist result in Context — survives navigation to About and back
      setResult(data)

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)

      // Non-blocking: audio generated in background for all modes, stored in Context
      startAudioGeneration(data.translated_text, data.explanation_text || null)
    } catch (err) {
      setError(err.message || 'అనువాదం కాలేదు. మళ్ళీ ప్రయత్నించండి.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-white to-indigo-50/40">

      {/* హీరో */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          AI తో తెలుగు అనువాదం
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 leading-tight mb-4 animate-fade-up" style={{ animationDelay: '80ms' }}>
          AI డాక్యుమెంట్ ట్రాన్స్‌లేటర్
          <br />
          <span className="text-indigo-600">ఆంగ్లం → తెలుగు</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '160ms' }}>
          ఆంగ్ల డాక్యుమెంట్లను అప్లోడ్ చేయండి — తెలుగులో చదవండి, వినండి.
        </p>
      </section>

      {/* దశలు */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-center animate-fade-up"
              style={{ animationDelay: `${i * 80 + 240}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                {step.icon}
              </div>
              <p className="text-xs font-semibold text-gray-600 leading-snug">{step.label}</p>
              <span className="text-xs text-gray-300 font-mono">0{i + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ప్రధాన UI */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ఎడమ: ఇన్‌పుట్ */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-20">
            <div>
              <h2 className="font-display font-semibold text-xl text-gray-800 mb-1">
                మీ ఫైల్‌ను అప్లోడ్ చేయండి
              </h2>
              <p className="text-xs text-gray-400">ఫైల్ అప్లోడ్ చేసి మోడ్ ఎంచుకోండి.</p>
            </div>

            <FileUploader file={file} onFileChange={handleFileChange} />
            <ModeSelector mode={mode} onModeChange={setMode} />

            {error && (
              <AlertMessage type="error" message={error} onDismiss={() => setError('')} />
            )}

            <GenerateButton onClick={handleGenerate} loading={loading} disabled={!file} />

            {loading && (
              <p className="text-center text-xs text-gray-400 animate-pulse">
                కొంచెం ఆగండి, మీ ఫైల్ చదువుతున్నాం…
              </p>
            )}
          </div>

          {/* కుడి: అవుట్‌పుట్ */}
          <div ref={outputRef} className="space-y-5 min-h-[300px]">

            {/* Empty state */}
            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-72 rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50/50 text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-400">ఇక్కడ తెలుగు రిజల్ట్ కనిపిస్తుంది</p>
                <p className="text-xs text-gray-300 mt-1">ఫైల్ అప్లోడ్ చేసి ఫలితం పొందండి నొక్కండి</p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center h-72 rounded-3xl border border-indigo-100 bg-indigo-50/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-indigo-700">తెలుగులోకి మారుస్తున్నాం…</p>
                    <p className="text-xs text-indigo-400 mt-1">AI పని చేస్తోంది, కొంచెం ఆగండి</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results — read from Context, visible after navigation back to Home too.
                Fix 3: domain is intentionally NOT shown anywhere in the UI.
                Fix 5: audio is generated for all three modes.
                  - translate: translationAudio for translated_text
                  - simplify:  translationAudio for translated_text (simplified)
                  - both:      translationAudio + explanationAudio separately */}
            {result && !loading && (
              <>
                {/* Main output — translate OR simplify OR both (first card) */}
                <OutputCard
                  title={result.mode === 'simplify' ? 'సులభ తెలుగు' : 'తెలుగు అనువాదం'}
                  text={result.translated_text}
                  audioSrc={translationAudio}
                  audioLoading={translationAudioLoading}
                  accent="indigo"
                />

                {/* Explanation card — only for mode=both */}
                {result.mode === 'both' && result.explanation_text && (
                  <OutputCard
                    title="సులభ వివరణ"
                    text={result.explanation_text}
                    audioSrc={explanationAudio}
                    audioLoading={explanationAudioLoading}
                    accent="emerald"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
