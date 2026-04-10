import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
  const body = await request.json()
  const { ids } = body

  await prisma.link.deleteMany({
    where: {
      id: { in: ids }
    }
  })

  return NextResponse.json({ success: true })
}