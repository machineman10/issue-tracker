"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextArea, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="space-y-2">
        <TextFieldInput placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <div className="space-y-2">
        <TextArea placeholder="Description" {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit new issue {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssuePage;
