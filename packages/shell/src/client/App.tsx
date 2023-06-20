import { useEffect, useState } from "react";
import * as ReactDOMClient from "react-dom/client";

// @ts-expect-error @todo fix types
import { Seach as RemoteSearch } from "searchzz/Search";

console.log("remote Search", RemoteSearch, JSON.stringify(RemoteSearch));

const App = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      console.log("client-side render");
      setTimeout(() => {
        setHydrated(true);
      }, 2000);
    }
  }, [hydrated]);

  return (
    <>
      <h1>App is {hydrated ? "hydrated 😎  !" : "rendered by server 🫶 "}</h1>
    </>
  );
};

if (typeof window !== "undefined") {
  ReactDOMClient.hydrateRoot(document.getElementById("root"), <App />);
}

export default App;
