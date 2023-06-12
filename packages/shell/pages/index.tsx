import dynamic from "next/dynamic";

const Page = dynamic(
  async () => {
    const yy = await import("../src/asyncPage");
    console.log(yy);
    return yy;
  },
  {
    ssr: false,
  }
);

const MyPage = () => <Page />;

export default MyPage;
