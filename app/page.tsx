import prisma from "@/lib/prisma";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openTotal = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressTotal = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedTotal = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <main>
      <IssueChart
        openIssuesTotal={openTotal}
        inProgressIssuesTotal={inProgressTotal}
        closedIssuesTotal={closedTotal}
      />
    </main>
  );
}
