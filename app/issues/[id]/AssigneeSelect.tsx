"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const router = useRouter();

  if (isLoading) return <Skeleton width="5rem" height="2rem" />;

  if (error) return null;

  const handleValueChange = async (value: string) => {
    try {
      let userId;
      if (value === "unassigned") userId = null;
      else userId = value;

      await axios.patch("/api/issues/" + issue.id, { userId });
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <SelectRoot
        onValueChange={handleValueChange}
        defaultValue={issue.userId || "unassigned"}
      >
        <SelectTrigger placeholder="Assign" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
