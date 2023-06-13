import React, { Suspense } from "react";

import dynamic from "next/dynamic";
const RemoteNavSSR = dynamic(
  () => {
    const zz = import("nav/nav");
    console.log("nav", zz);
    return zz;
  },
  { suspense: true }
);

const Page = dynamic(async () => import("../src/asyncPage"), {
  ssr: false,
});

const MyPage = () => {
  return (
    <>
      <Page />;
      <RemoteNavSSR />
    </>
  );
};

export default MyPage;
