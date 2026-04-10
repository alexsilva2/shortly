export const dynamic = "force-dynamic";

import { prisma } from "../lib/prisma"
import { redirect } from "next/navigation"
import LinkList from "./linklist"
import Link from "next/link"

export default async function Dashboard() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" }
  })

  if (links.length === 0) {
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Home
        </Link>
      </div>
      <LinkList links={links} />
    </main>
  )
}