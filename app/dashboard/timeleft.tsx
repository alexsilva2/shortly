"use client"

import { useEffect, useState } from "react"

export default function TimeLeft({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    function calculate() {
      const diff = new Date(expiresAt).getTime() - Date.now()

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft(`${days}d ${hours}h ${minutes}m`)
    }

    calculate()
    const interval = setInterval(calculate, 60000)
    return () => clearInterval(interval)
  }, [expiresAt])

  return (
    <span className={timeLeft === "Expired" ? "text-red-400" : "text-green-400"}>
      {timeLeft}
    </span>
  )
}