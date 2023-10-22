import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { patchIssueSchema } from "@/lib/zodValidation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const { title, description, userId } = body;

  const validateBody = patchIssueSchema.safeParse(body);

  if (!validateBody.success)
    return NextResponse.json(validateBody.error.format(), { status: 400 });

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "Invalid user!" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: +params.id } });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue!" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: {
      title,
      description,
      userId,
    },
  });

  return NextResponse.json(updatedIssue);
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
