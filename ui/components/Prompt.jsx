import Link from "next/link";
import React, { useState } from "react";
import { format } from "../src/utils.js";

export const Prompt = ({ item }) => {
  return (
    <div
      className="grid gap-3 sticky top-0 max-w-full"
      style={{ gridTemplateColumns: `10ch auto`, gridAutoRows: "min-content" }}
    >
      <div>Link</div>
      <Link href={"/prompts?id=" + item.id}>
        <a className="underline">{item.id}</a>
      </Link>

      <div>Date</div>
      <div>{format(new Date(item.date))}</div>
      <div>Input</div>
      <div>{item.input}</div>

      <div>Output</div>
      <div></div>
      <div className="col-span-2 whitespace-pre-wrap font-mono max-w-full">
        <strong>
          <i>{item.output.slice(0, item.input.length)}</i>
        </strong>
        {item.output.slice(item.input.length)}
      </div>
    </div>
  );
};
