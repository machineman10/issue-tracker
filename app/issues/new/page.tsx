"use client";

import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextFieldInput placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button type="submit">Submit new issue</Button>
      </form>
      {error && (
        <CalloutRoot color="red">
          <CalloutIcon>
            <InfoCircledIcon />
          </CalloutIcon>
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
    </div>
  );
};

export default NewIssuePage;
