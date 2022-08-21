import React from "react";
import Head from "next/head";
import "../src/global.scss";
import { NavBar } from "../components/NavBar.jsx";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Transformers UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-nowrap h-[100vh] dark bg-slate-900 text-white">
        <NavBar />
        <div className="overflow-y-hidden flex-1">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}
