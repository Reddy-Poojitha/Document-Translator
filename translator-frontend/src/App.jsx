import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TranslatorProvider } from './context/TranslatorContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    // TranslatorProvider wraps the entire app so Context state survives
    // any React Router navigation without touching browser storage.
    <TranslatorProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TranslatorProvider>
  )
}
