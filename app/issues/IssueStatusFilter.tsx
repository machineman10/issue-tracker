"use client";

import { Status } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    const status = value === "all" ? "" : `?status=${value}`;
    router.push(`/issues${status}`);
  };
  return (
    <SelectRoot onValueChange={handleValueChange}>
      <SelectTrigger placeholder="Filter by status..." />
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.label} value={status.value || "all"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default IssueStatusFilter;
