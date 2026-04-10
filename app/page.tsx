"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleShorten() {
    if (!url) return

    try {
      new URL(url)
    } catch {
      setError("Invalid URL. Please include https:// (e.g. https://google.com)")
      return
    }

    setError("")
    await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          shortly.
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Paste your URL and get a short link instantly
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              className={`flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 ${
                error ? "ring-2 ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            <button
              onClick={handleShorten}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Shorten
            </button>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-500 text-red-300 text-sm px-4 py-2 rounded-lg">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}