import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { issueSchema } from "@/lib/zodValidation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validateBody = issueSchema.safeParse(body);

  if (!validateBody.success)
    return NextResponse.json(validateBody.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue!" }, { status: 404 });

  await prisma.issue.update({
    where: { id: +params.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({});
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue!" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: +params.id },
  });

  return NextResponse.json({});
}
