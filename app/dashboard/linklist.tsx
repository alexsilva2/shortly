"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import TimeLeft from "./timeleft"

type Link = {
  id: string
  url: string
  slug: string
  clicks: number
  expiresAt: Date | null
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange() }}
      className={`w-12 h-6 rounded-full cursor-pointer transition-colors flex items-center px-1 ${
        checked ? "bg-blue-600" : "bg-gray-600"
      }`}
    >
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
        checked ? "translate-x-6" : "translate-x-0"
      }`} />
    </div>
  )
}

export default function LinkList({ links }: { links: Link[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState("")
  const [error, setError] = useState("")

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function toggleSelectAll() {
    if (selected.length === links.length) {
      setSelected([])
    } else {
      setSelected(links.map(l => l.id))
    }
  }

  async function handleShorten() {
    if (!newUrl) return

    try {
      new URL(newUrl)
    } catch {
      setError("Invalid URL. Please include https:// (e.g. https://google.com)")
      return
    }

    setError("")
    await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: newUrl }),
    })
    setNewUrl("")
    window.location.reload()
  }

 async function handleDelete() {
  await fetch("/api/links", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: selected }),
  })

  const remaining = links.filter(l => !selected.includes(l.id))
  if (remaining.length === 0) {
    window.location.href = "/"
  } else {
    window.location.reload()
  }
}

  async function handleCopy() {
    const link = links.find(l => l.id === selected[0])
    if (link) {
      await navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://example.com"
            value={newUrl}
            onChange={(e) => { setNewUrl(e.target.value); setError("") }}
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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Toggle
            checked={selected.length === links.length && links.length > 0}
            onChange={toggleSelectAll}
          />
          <span className="text-gray-400 text-sm">Select all</span>
        </div>

        {selected.length > 0 && (
          <div className="flex gap-3">
            {selected.length === 1 && (
              <button
                onClick={handleCopy}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Copy
              </button>
            )}
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Delete ({selected.length})
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className={`rounded-lg px-6 py-4 flex items-center justify-between transition-colors ${
              selected.includes(link.id)
                ? "bg-blue-900 border border-blue-500"
                : "bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-4">
              <Toggle
                checked={selected.includes(link.id)}
                onChange={() => toggleSelect(link.id)}
              />
              <div>
                <p className="text-white font-medium">{link.url}</p>
                <p className="text-blue-400 text-sm">/{link.slug}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="text-right flex flex-col gap-1">
              <p className="text-white font-bold text-xl">{link.clicks} clicks</p>
              {link.expiresAt && (
                <TimeLeft expiresAt={link.expiresAt} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}