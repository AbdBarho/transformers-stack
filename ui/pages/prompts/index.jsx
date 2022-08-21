import React, { useEffect, useState } from "react";
import { format } from "../../src/utils.js";
import { Prompt } from "../../components/Prompt.jsx";
import cn from "classnames";
import { useRouter } from "next/router";
import { db } from "../../src/db.js";

export default function Home({ prompts }) {
  const router = useRouter();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const id = router.query?.id;
    const item = prompts.find((el) => el.id === id);
    setItem(item);
  }, [prompts, router]);

  return (
    <section className="grid gap-9 p-4 h-full overflow-hidden" style={{ gridTemplateColumns: `350px 1fr` }}>
      <div className="h-full overflow-y-auto">
        <strong className="block">Prompts</strong>
        {prompts.map((entry, i) => {
          const { input, date, id } = entry;
          return (
            <div
              key={id}
              className={cn(
                `text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer select-none py-1 hover:bg-slate-600`,
                { "bg-sky-600 hover:bg-sky-600": id === item?.id }
              )}
              onClick={() => router.push("?id=" + id, undefined, { shallow: true })}
            >
              {format(new Date(date))} - <strong>{input}</strong>
            </div>
          );
        })}
      </div>
      <div className="h-full overflow-y-auto">{item && <Prompt item={item} />}</div>
    </section>
  );
}

export async function getServerSideProps({ req, res, params, preview }) {
  return {
    props: {
      prompts: Object.values(db.read()).reverse(),
    },
  };
}
