import { IssueStatusBadge } from "@/app/components";
import prisma from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

const IssueDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) notFound();

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetailsPage;
