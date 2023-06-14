import RemoteNavSSR from "../components/RemoteNavSSR";

export const getServerSideProps = async () => {
  const props = await new Promise((resolve) =>
    setTimeout(
      () => resolve({ getSSRprops: "some getServerSideProps 😎 " }),
      300
    )
  );
  console.log("😺  ~ Fetch complete", props);
  return { props };
};

const Page = (props) => <RemoteNavSSR {...props} />;

export default Page;
