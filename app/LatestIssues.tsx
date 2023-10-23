import prisma from "@/lib/prisma";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });

  return (
    <Card>
      <Heading mb="5" ml="2">
        Latest issues
      </Heading>
      <TableRoot>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.user && (
                    <Avatar
                      src={issue.user.image!}
                      fallback="?"
                      radius="full"
                      size="2"
                    />
                  )}
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
};

export default LatestIssues;
