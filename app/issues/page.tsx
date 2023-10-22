export const dynamic = "force-dynamic";

import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import {
  Box,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams: { status } }: Props) => {
  const validStatuses = Object.values(Status);
  const queryStatus = validStatuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: queryStatus },
  });

  return (
    <Box>
      <IssueActions />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Title</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
};

export default IssuesPage;
