import dynamic from "next/dynamic";

const App = dynamic(
  async () => {
    return import("../src/asyncApp");
  },
  {
    ssr: false,
  }
);

function MyApp(props) {
  return <App {...props} />;
}

export default MyApp;
