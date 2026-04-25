import React, { createContext, useContext, useState } from 'react'

/**
 * TranslatorContext — holds all translation output in React memory only.
 * State lives as long as the browser tab is open. A page refresh resets it.
 * No localStorage, sessionStorage, cookies, or IndexedDB used anywhere.
 */
const TranslatorContext = createContext(null)

export function TranslatorProvider({ children }) {
  // Input selections — persisted so the left panel stays configured
  const [fileName, setFileName]   = useState('')   // display name only; File object lives in Home
  const [mode, setMode]           = useState('translate')

  // Translation output from /upload/
  const [result, setResult]       = useState(null)  // { domain, mode, translated_text, explanation_text? }

  // Audio data URIs from /generate-audio/  (data:audio/mp3;base64,…)
  const [translationAudio, setTranslationAudio]       = useState(null)
  const [explanationAudio, setExplanationAudio]       = useState(null)

  // Loading flags for background audio generation
  const [translationAudioLoading, setTranslationAudioLoading] = useState(false)
  const [explanationAudioLoading, setExplanationAudioLoading] = useState(false)

  /** Call this to clear all output (e.g. when the user uploads a new file) */
  function clearResult() {
    setResult(null)
    setTranslationAudio(null)
    setExplanationAudio(null)
    setTranslationAudioLoading(false)
    setExplanationAudioLoading(false)
  }

  return (
    <TranslatorContext.Provider value={{
      // Input
      fileName, setFileName,
      mode, setMode,
      // Output
      result, setResult,
      translationAudio, setTranslationAudio,
      explanationAudio, setExplanationAudio,
      translationAudioLoading, setTranslationAudioLoading,
      explanationAudioLoading, setExplanationAudioLoading,
      clearResult,
    }}>
      {children}
    </TranslatorContext.Provider>
  )
}

/** Convenience hook */
export function useTranslator() {
  const ctx = useContext(TranslatorContext)
  if (!ctx) throw new Error('useTranslator must be used inside TranslatorProvider')
  return ctx
}
