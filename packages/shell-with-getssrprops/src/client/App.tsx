import { StrictMode, useEffect, useState } from "react";
import * as ReactDOMClient from "react-dom/client";

// @ts-expect-error @todo fix types
import { Remote, getServerSideProps } from "remote1/Remote";

type AppProps = {
  classifiedId?: string;
  data?: {
    data: string;
  };
};

const App = ({ classifiedId, data }: AppProps) => {
  const [hydrated, setHydrated] = useState(false);

  console.log("App data", classifiedId, data);

  useEffect(() => {
    if (!hydrated) {
      setTimeout(() => {
        setHydrated(true);
      }, 2000);
    }
  }, [hydrated]);

  return (
    <>
      <h1>App is {hydrated ? "hydrated 😎  !" : "rendered by server 🫶 "}</h1>
      <Remote id={classifiedId} data={data} />
      <script
        id="__SSR_DATA__"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ data, classifiedId }),
        }}
      />
    </>
  );
};

if (typeof window !== "undefined") {
  const { data = "something went wrong....", classifiedId = "" } = JSON.parse(
    // @ts-expect-error @todo fix types
    document.getElementById("__SSR_DATA__").text
  );
  console.log("Retrieved data", classifiedId, data);
  ReactDOMClient.hydrateRoot(
    document.getElementById("root"),
    <App classifiedId={classifiedId} data={data} />
  );
}

export { getServerSideProps };
export default App;
