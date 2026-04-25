import React, { useRef, useState, useEffect } from 'react'
import { formatTime } from '../utils/helpers'
import LoaderSpinner from './LoaderSpinner'

const SPEEDS = [0.5, 1, 1.5, 2]

export default function AudioPlayer({ audioSrc, loading, label }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)

  // When new audio arrives, reset state
  useEffect(() => {
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [audioSrc])

  // Sync speed to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }, [speed])

  function togglePlay() {
    if (!audioRef.current || !audioSrc) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  function onLoadedMetadata() {
    setDuration(audioRef.current?.duration || 0)
  }

  function onTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

  function onEnded() {
    setPlaying(false)
    setCurrentTime(0)
  }

  function onPlay() { setPlaying(true) }
  function onPause() { setPlaying(false) }

  function seek(e) {
    if (!audioRef.current || !duration) return
    const newTime = (e.target.value / 100) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {playing ? (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="wave-bar" style={{ animationDelay: `${(i - 1) * 0.1}s` }} />
              ))}
            </div>
          ) : (
            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
          <span className="text-xs font-semibold text-gray-600">{label || 'ఆడియో వినండి'}</span>
        </div>

        {loading && <LoaderSpinner size="sm" label="ఆడియో తయారవుతోంది..." />}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={loading || !audioSrc}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            loading || !audioSrc
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-sm'
          }`}
          aria-label={playing ? 'పాజ్ చేయండి' : 'ప్లే చేయండి'}
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Time + Seek */}
        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={seek}
            disabled={loading || !audioSrc || !duration}
            className="w-full h-1 accent-indigo-600 disabled:opacity-40"
            aria-label="వెతకండి"
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-400 font-mono">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-400 font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Speed controls */}
      <div className="flex items-center gap-1.5 pt-0.5">
        <span className="text-xs text-gray-400 mr-1">వేగం మార్చండి:</span>
        {SPEEDS.map(s => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            disabled={loading || !audioSrc}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              speed === s
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40'
            }`}
          >
            {s}×
          </button>
        ))}
      </div>

      {/* Hidden audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onPlay={onPlay}
          onPause={onPause}
          preload="auto"
        />
      )}
    </div>
  )
}
