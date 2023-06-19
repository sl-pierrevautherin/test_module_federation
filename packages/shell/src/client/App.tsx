import { useEffect, useState } from "react";

// @ts-expect-error @todo fix types
import RemoteSearch from "search/Search";

console.log("remote Search", RemoteSearch);

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
      <RemoteSearch />
    </>
  );
};

export default App;
