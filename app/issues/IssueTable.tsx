import { Link } from "@/app/components";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  Flex,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge } from "../components";
import { IssueQuery } from "./page";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnsValueArr = columns.map((column) => column.value);

export default IssueTable;
