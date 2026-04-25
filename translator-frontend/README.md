# AI Document Translator — English → Telugu

A full-stack web app that translates and simplifies English documents into Telugu with automatic audio playback.

---

## Project Structure

```
translator-frontend/        ← React + Tailwind frontend (this folder)
backend/                    ← FastAPI backend (from b.zip)
```

---

## Quick Start

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# Backend runs at http://localhost:8000
```

### 2. Start the Frontend

```bash
cd translator-frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

Open your browser at **http://localhost:5173**

---

## How the App Works

### Workflow
1. User uploads a PDF, DOCX, or TXT file
2. Selects a mode: **Translate**, **Simplify**, or **Both**
3. Clicks **Generate Output**
4. `POST /upload/` is called → Telugu text appears immediately
5. `POST /generate-audio/` is called **automatically in the background**
6. Audio player enables itself once audio is ready — no user action needed
7. User clicks Play → audio starts **instantly** (pre-loaded)

### Mode = Both
- Two OutputCards are shown: Translation + Explanation
- Two separate audio calls are made in the background
- Two independent audio players appear

---

## API Integration

### `services/api.js`

| Function | Endpoint | Details |
|---|---|---|
| `translateDocument(file, mode)` | `POST /upload/` | FormData: `file`, `mode` |
| `generateAudio(text)` | `POST /generate-audio/` | Raw JSON string body |

Audio response is converted to: `data:audio/mp3;base64,<audio_base64>`

---

## Features

- ✅ Drag-and-drop file upload with format validation
- ✅ Three translation modes (translate / simplify / both)
- ✅ Formatting preserved with `white-space: pre-wrap`
- ✅ Background audio preloading — play is instant
- ✅ Playback speed: 0.5×, 1×, 1.5×, 2×
- ✅ Responsive: two-column desktop, stacked mobile
- ✅ Three pages: Home, About, Contact (with FAQ)
- ✅ Error handling for all API failures
- ✅ Domain badge displayed in output

---

## Tech Stack

- **React 18** + **React Router 6**
- **Tailwind CSS 3**
- **Axios** for API calls
- **Vite** as build tool
- Google Fonts: Playfair Display + DM Sans

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Failed to connect to translation server" | Start FastAPI: `uvicorn main:app --reload` |
| Audio player stays disabled | Audio generation takes 5–20s; wait for "Generating audio…" to clear |
| File not uploading | Only PDF, DOCX, TXT are accepted |
| CORS error | Backend already has `allow_origins=["*"]` — restart the backend |
