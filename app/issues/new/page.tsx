import { Button, TextArea, TextFieldInput } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextFieldInput placeholder="title" />
      <TextArea placeholder="description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
