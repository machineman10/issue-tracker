import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "./components";

interface Props {
  data: {
    openIssuesTotal: number;
    inProgressIssuesTotal: number;
    closedIssuesTotal: number;
  };
}

const IssueSummary = ({ data }: Props) => {
  const containers: { label: string; count: number; status: Status }[] = [
    { label: "Open issues", count: data.openIssuesTotal, status: "OPEN" },
    {
      label: "In-progress issues",
      count: data.inProgressIssuesTotal,
      status: "IN_PROGRESS",
    },
    { label: "Closed issues", count: data.closedIssuesTotal, status: "CLOSED" },
  ];

  return (
    <Flex justify="center" gap="4">
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction="column" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="6" className="font-semibold">
              {container.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
