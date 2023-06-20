import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Search } from "..";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Search />
    </StrictMode>
  );
}
