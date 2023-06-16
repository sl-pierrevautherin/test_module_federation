import App from "./App";
import * as ReactDOMClient from "react-dom/client";

ReactDOMClient.hydrateRoot(document.getElementById("root"), <App />);
