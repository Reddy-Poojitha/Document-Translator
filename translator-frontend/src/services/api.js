import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2 minutes for large documents
})

/**
 * Upload a document for translation/simplification.
 * @param {File} file
 * @param {string} mode - 'translate' | 'simplify' | 'both'
 * @returns {Promise<object>} - { domain, mode, translated_text, explanation_text? }
 */
export async function translateDocument(file, mode) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('mode', mode)

  try {
    const response = await api.post('/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response.data?.error) {
      throw new Error(response.data.error)
    }

    return response.data
  } catch (err) {
    if (err.response) {
      throw new Error(
        err.response.data?.detail || err.response.data?.error || `Server error: ${err.response.status}`
      )
    } else if (err.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The document may be too large or the server is busy.')
    } else if (err.message) {
      throw err
    } else {
      throw new Error('Failed to connect to the translation server. Is the backend running?')
    }
  }
}

/**
 * Generate audio for Telugu text.
 * @param {string} text - Telugu text to convert to speech
 * @returns {Promise<string>} - base64 audio data URI
 */
export async function generateAudio(text) {
  try {
    const response = await api.post(
      '/generate-audio/',
      text,          // send raw string body
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const { audio_base64 } = response.data

    if (!audio_base64) {
      throw new Error('No audio data returned from server.')
    }

    return `data:audio/mp3;base64,${audio_base64}`
  } catch (err) {
    if (err.response) {
      throw new Error(
        err.response.data?.detail || err.response.data?.error || `Audio server error: ${err.response.status}`
      )
    } else if (err.code === 'ECONNABORTED') {
      throw new Error('Audio generation timed out.')
    } else if (err.message) {
      throw err
    } else {
      throw new Error('Failed to generate audio.')
    }
  }
}
