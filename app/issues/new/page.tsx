"use client";

import { Button, TextArea, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <TextFieldInput placeholder="Title" {...register("title")} />
      <TextArea placeholder="Description" {...register("description")} />
      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
