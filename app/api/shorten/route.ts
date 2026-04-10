import { prisma } from "../../lib/prisma"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // Adicione essa linha temporariamente:
  console.log("DATABASE_URL existe?", !!process.env.DATABASE_URL)

  try {
    const body = await request.json()
    const { url } = body
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const slug = nanoid(6)

    const link = await prisma.link.create({
      data: { url, slug, expiresAt },
    })

    return NextResponse.json({ slug: link.slug })
  } catch (error) {
    console.error("Erro detalhado:", error) // <-- vai aparecer nos logs da Vercel
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}