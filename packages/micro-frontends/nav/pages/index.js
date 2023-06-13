import React, { Fragment, Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Home = ({ loaded }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/nextjs-ssr/home/public/favicon.ico" />
      </Head>

      <div className="hero">
        <h1 className="title">
          Welcome to Next.js on Webpack 5! <code>home</code>
        </h1>
      </div>
    </div>
  );
};
//
Home.getInitialProps = async (ctx) => {
  return {};
};

export default Home;
