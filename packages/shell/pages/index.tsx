import dynamic from "next/dynamic";

const RemoteNavSSR = dynamic(
  () => {
    const zz = import("nav/nav");
    console.log("RemoteNavSSR", zz);
    return zz;
  },
  { suspense: true }
);

const RemoteButton = dynamic(async () => import("remote/Button"), {
  ssr: false,
});

const RemoteSearch = dynamic(async () => import("search/Search"), {
  ssr: false,
});

const MyPage = () => {
  return (
    <>
      <RemoteSearch />
      <RemoteButton />
      <RemoteNavSSR />
    </>
  );
};

export default MyPage;
