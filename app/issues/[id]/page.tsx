import prisma from "@/lib/prisma";
import { Box, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssueDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <Flex direction={{ initial: "column" }} gap="4">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Flex gap="4">
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
        <Box>
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default IssueDetailsPage;
