import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { Box, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const issue = await fetchIssue(params.id);

  return {
    title: issue?.title,
    description: `Details of the issue ${issue?.id}`,
  };
}

const IssueDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return (
    <Flex direction={{ initial: "column" }} gap="4" className="max-w-xl">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex gap="4">
          <Box>
            <EditIssueButton issueId={issue.id} />
          </Box>
          <Box>
            <DeleteIssueButton issueId={issue.id} />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default IssueDetailsPage;
