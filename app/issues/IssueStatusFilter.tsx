"use client";

import { Status } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <SelectRoot
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("status") || ""}
    >
      <SelectTrigger placeholder="Filter by status..." />
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.label} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default IssueStatusFilter;
