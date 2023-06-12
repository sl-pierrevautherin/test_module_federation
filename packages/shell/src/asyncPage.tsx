import dynamic from "next/dynamic";

const RemoteButton = dynamic(
  async () => {
    const zz = import("remote/Button");
    console.log("Button", zz);
    return zz;
  },
  {
    ssr: false,
  }
);

const RemoteSearch = dynamic(
  async () => {
    const zz = import("search/Search");
    console.log("Search: ", zz);
    return zz;
  },
  {
    ssr: false,
  }
);

const AsyncPage = () => (
  <>
    <div>Hello!</div>
    <RemoteSearch />
    <RemoteButton />
  </>
);

export default AsyncPage;
