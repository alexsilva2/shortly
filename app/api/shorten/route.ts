import { prisma } from "../../lib/prisma"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { url } = body
const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const slug = nanoid(6)

  const link = await prisma.link.create({
    data: {
      url,
      slug,
      expiresAt,
    },
  })

  return NextResponse.json({ slug: link.slug })
}