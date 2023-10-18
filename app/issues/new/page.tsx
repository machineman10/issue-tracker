"use client";

import { issueSchema } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="space-y-2">
        <TextFieldInput placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
      </div>
      <div className="space-y-2">
        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
      </div>

      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
