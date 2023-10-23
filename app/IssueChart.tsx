"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  openIssuesTotal: number;
  inProgressIssuesTotal: number;
  closedIssuesTotal: number;
}

const IssueChart = ({
  openIssuesTotal,
  inProgressIssuesTotal,
  closedIssuesTotal,
}: Props) => {
  const data: { label: string; count: number }[] = [
    { label: "Open", count: openIssuesTotal },
    { label: "In Progress", count: inProgressIssuesTotal },
    { label: "Closed", count: closedIssuesTotal },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="count"
            barSize={40}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
