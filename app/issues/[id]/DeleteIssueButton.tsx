"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Button color="red">
          <TrashIcon />
          <p>Delete issue</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Do you want to permanently delete this issue?
        </AlertDialogDescription>

        <Flex mt="4" gap="3" justify="end">
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="solid" color="red" onClick={deleteHandler}>
              Delete
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default DeleteIssueButton;
