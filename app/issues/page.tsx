export const dynamic = "force-dynamic";

import { Pagination } from "@/app/components";
import prisma from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { columnsValueArr } from "./IssueTable";

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View all the project issues",
};

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const queryStatus = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsValueArr.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = +searchParams.page || 1;
  const issuePerPage = 10;

  const issues = await prisma.issue.findMany({
    where: { status: queryStatus },
    orderBy,
    skip: (currentPage - 1) * issuePerPage,
    take: issuePerPage,
  });

  const totalIssues = await prisma.issue.count({
    where: { status: queryStatus },
  });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        totalItem={totalIssues}
        itemPerPage={issuePerPage}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export default IssuesPage;
