"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  data: {
    openIssuesTotal: number;
    inProgressIssuesTotal: number;
    closedIssuesTotal: number;
  };
}

const IssueChart = ({ data }: Props) => {
  const dataMap: { label: string; count: number }[] = [
    { label: "Open", count: data.openIssuesTotal },
    { label: "In Progress", count: data.inProgressIssuesTotal },
    { label: "Closed", count: data.closedIssuesTotal },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataMap}>
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
