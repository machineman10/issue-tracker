import prisma from "@/lib/prisma";
import { issueSchema } from "@/lib/zodValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validateBody = issueSchema.safeParse(body);

  if (!validateBody.success)
    return NextResponse.json(validateBody.error.issues, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
