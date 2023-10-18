import prisma from "@/lib/prisma";
import {
  Button,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>
      <TableRoot variant="surface">
        <TableRow>
          <TableColumnHeaderCell>Title</TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Status
          </TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            CreatedAt
          </TableColumnHeaderCell>
        </TableRow>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                {issue.title}
                <div className="block md:hidden">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.status}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};

export default IssuesPage;
