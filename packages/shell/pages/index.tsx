import React, { Suspense } from "react";

import type { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

const RemoteNavSSR = dynamic(() => import("nav/nav"), {
  suspense: true,
  ssr: true,
});

const RemoteButton = dynamic(async () => import("remote/Button"), {
  ssr: false,
});

const RemoteSearch = dynamic(async () => import("search/Search"), {
  ssr: false,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nav = await import("nav/nav");
  console.log("+++++++++++=nav", nav);
  if (nav.getServerSideProps) {
    const props = await nav.getServerSideProps(context);
    console.log("---------=props", props);

    return props;
  }

  return {
    props: {},
  };
}

const MyPage = (props) => {
  return (
    <>
      <RemoteNavSSR {...props} />
      <RemoteSearch />
      <RemoteButton />
    </>
  );
};

export default MyPage;
