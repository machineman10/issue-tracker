import { Status } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Filter by status..." />
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value || "all"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default IssueStatusFilter;
