import type { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import RemoteNavSSR from "nav/nav";

// https://github.com/vercel/next.js/discussions/37631

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
      <>
        <Suspense fallback={null}>
          <RemoteNavSSR {...props} key="SSR" />
        </Suspense>
      </>
      <RemoteSearch key="search" />
      <RemoteButton key="button" />
    </>
  );
};

export default MyPage;
