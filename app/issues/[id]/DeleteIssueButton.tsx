"use client";

import { Spinner } from "@/app/components";
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
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const deleteHandler = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button color="red" disabled={isDeleting}>
            <TrashIcon />
            <p>Delete issue</p>
            {isDeleting && <Spinner />}
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
      <AlertDialogRoot open={error}>
        <AlertDialogContent>
          <AlertDialogTitle>Error!</AlertDialogTitle>
          <AlertDialogDescription>
            This issue can not be deleted.
          </AlertDialogDescription>
          <Flex mt="3" justify="end">
            <AlertDialogAction>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                Ok
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default DeleteIssueButton;
