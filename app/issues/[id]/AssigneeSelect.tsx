import prisma from "@/lib/prisma";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";

const AssigneeSelect = async () => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return (
    <SelectRoot>
      <SelectTrigger placeholder="Assign" />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suggestions</SelectLabel>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default AssigneeSelect;
