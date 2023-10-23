import { IssueStatusBadge } from "@/app/components";
import { authOptions } from "@/lib/authOptions";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Markdown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetails = async ({ issue }: { issue: Issue }) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Flex justify="between">
        <Heading>{issue.title}</Heading>
        {session && <AssigneeSelect issue={issue} />}
      </Flex>
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

export default IssueDetails;
