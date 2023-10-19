"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/lib/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
}); //stop server side rendering for this import

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="space-y-2">
        <TextFieldInput placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <div className="space-y-2">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit new issue {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default NewIssuePage;
