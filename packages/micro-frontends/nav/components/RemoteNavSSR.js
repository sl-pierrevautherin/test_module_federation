import React, { Suspense } from "react";
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
    <nav>
      RemoteNavSSR - a NextJS ModuleFederation component with SSR
      <p>props: {props.getSSRprops}</p>
      {/* <HelloWorld /> */}
    </nav>
  );
};

export default RemoteNavSSR;
