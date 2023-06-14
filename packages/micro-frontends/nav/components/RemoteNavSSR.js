import dynamic from "next/dynamic";

export const HelloWorld = dynamic(
  () =>
    import("./helloWorld").then((mod) => {
      return { default: mod.HelloWorld };
    }),
  { suspense: true }
);

const RemoteNavSSR = (props) => {
  console.log("Hello from MF Nav - a NextJS component with SSR !!", props);

  return (
    <>
      <div>RemoteNavSSR - a NextJS ModuleFederation component with SSR</div>
      <div>props: {props.getSSRprops}</div>
    </>
  );
};

export default RemoteNavSSR;
