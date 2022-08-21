import React, { useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router.js";
import cn from "classnames";

const items = [
  {
    text: "View Prompts",
    href: "/prompts",
  },
  {
    text: "Create New Prompt!",
    href: "/create",
  },
];
export const NavBar = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-around text-center">
      {items.map(({ href, text }, i) => {
        const isActive = router.route.startsWith(href);
        return (
          <Link href={href} key={i + href}>
            <button
              disabled={isActive}
              className={cn("grow enabled:hover:bg-slate-600 enabled:cursor-pointer p-3 font-medium text-xl", {
                "bg-sky-900": !isActive,
              })}
            >
              {text}
            </button>
          </Link>
        );
      })}
    </nav>
  );
};
