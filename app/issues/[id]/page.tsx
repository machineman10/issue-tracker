import { IssueStatusBadge } from "@/app/components";
import prisma from "@/lib/prisma";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
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
    <Flex direction={{ initial: "column", md: "row" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="2" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default IssueDetailsPage;
