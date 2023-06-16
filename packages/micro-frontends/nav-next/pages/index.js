// import dynamic from "next/dynamic";
import RemoteNavSSR from "../components/RemoteNavSSR";

// const RemoteNavSSR = dynamic(
//   () => {
//     const zz = import("../components/RemoteNavSSR");
//     console.log("RemoteNavSSR", zz);
//     return zz;
//   },
//   { suspense: true }
// );

export const getServerSideProps = async () => {
  const props = await new Promise((resolve) =>
    setTimeout(() => {
      const props = { getSSRprops: "some getServerSideProps 😎 " };
      console.log("😺  ~ Fetch complete", props);
      resolve(props);
    }, 300)
  );
  return { props };
};

const Page = (props) => <RemoteNavSSR {...props} key="remoteNavSSR" />;

export default Page;
