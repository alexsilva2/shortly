import { prisma } from "../lib/prisma"
import { redirect, notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const link = await prisma.link.findUnique({
    where: { slug }
  })

  if (!link) {
    notFound()
  }

  if (link.expiresAt && link.expiresAt < new Date()) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Link Expired
          </h1>
          <p className="text-gray-400">
            This link has expired and is no longer available.
          </p>
        </div>
      </main>
    )
  }

  await prisma.link.update({
    where: { slug },
    data: { clicks: link.clicks + 1 }
  })

  redirect(link.url)
}