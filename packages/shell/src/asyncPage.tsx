import dynamic from "next/dynamic";

const RemoteButton = dynamic(async () => import("remote/Button"), {
  ssr: false,
});

const RemoteSearch = dynamic(async () => import("search/Search"), {
  ssr: false,
});

const AsyncPage = () => (
  <>
    <div>Hello!</div>
    <RemoteSearch />
    <RemoteButton />
  </>
);

export default AsyncPage;
