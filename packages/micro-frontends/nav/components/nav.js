import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

export const HelloWorld = dynamic(
  () =>
    import("./helloWorld").then((mod) => {
      return { default: mod.HelloWorld };
    }),
  { suspense: true }
);

const Nav = () => {
  console.log("Nav component with SSR !!");
  return (
    <nav>
      Nav !
      <HelloWorld />
    </nav>
  );
};

export default Nav;
