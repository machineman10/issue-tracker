import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Flex justify="between">
        <Heading>{issue.title}</Heading>
        <AssigneeSelect issue={issue} />
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
