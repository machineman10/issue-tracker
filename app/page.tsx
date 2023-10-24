export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

export default async function Home() {
  const openIssuesTotal = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgressIssuesTotal = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssuesTotal = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const totalCountsByStatus = {
    openIssuesTotal,
    inProgressIssuesTotal,
    closedIssuesTotal,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex gap="5" direction="column">
        <IssueSummary data={totalCountsByStatus} />
        <IssueChart data={totalCountsByStatus} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
