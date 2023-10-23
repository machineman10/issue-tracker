export const dynamic = "force-dynamic";

import { IssueStatusBadge, Link, Pagination } from "@/app/components";
import prisma from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const queryStatus = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = +searchParams.page || 1;
  const issuePerPage = 10;

  const issues = await prisma.issue.findMany({
    where: { status: queryStatus },
    skip: (currentPage - 1) * issuePerPage,
    take: issuePerPage,
    orderBy,
  });

  const totalIssues = await prisma.issue.count({
    where: { status: queryStatus },
  });

  return (
    <Box>
      <IssueActions />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  <Flex align="center">
                    {column.label}
                    {column.value === searchParams.orderBy && <ArrowUpIcon />}
                  </Flex>
                </NextLink>
              </TableColumnHeaderCell>
            ))}
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
      <Flex mt="5">
        <Pagination
          totalItem={totalIssues}
          itemPerPage={issuePerPage}
          currentPage={currentPage}
        />
      </Flex>
    </Box>
  );
};

export default IssuesPage;
