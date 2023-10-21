import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { issueSchema } from "@/lib/zodValidation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const validateBody = issueSchema.safeParse(body);

  if (!validateBody.success)
    return NextResponse.json(validateBody.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
