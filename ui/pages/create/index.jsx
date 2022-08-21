import React from "react";
import { useState } from "react";
import { SpinnerDotted } from "spinners-react";

import { PromptForm } from "../../components/Form.jsx";
import { Prompt } from "../../components/Prompt.jsx";

export default function Create() {
  const [isSubmitting, setSubmit] = useState(false);
  const [output, setOutput] = useState(null);
  const [err, setErr] = useState(null);

  return (
    <div className="p-4 grid grid-cols-[1fr_1fr] gap-8 w-full h-full overflow-hidden">
      <PromptForm
        onSubmit={async (vals) => {
          setErr(null);
          setOutput(null);
          setSubmit(true);
          await submit(vals).then(setOutput).catch(setErr);
          setSubmit(false);
        }}
      />

      {isSubmitting && (
        <div className="flex justify-center">
          <SpinnerDotted className="!text-sky-500" />
        </div>
      )}
      {err && JSON.stringify(err, null, 2)}
      {output && (
        <div className="overflow-x-auto">
          <Prompt item={output} />
        </div>
      )}
    </div>
  );
}

const submit = async (values) => {
  const res = await fetch("/api/prompts", {
    method: "POST",
    body: JSON.stringify(values),
  });
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw await res.text();
};
