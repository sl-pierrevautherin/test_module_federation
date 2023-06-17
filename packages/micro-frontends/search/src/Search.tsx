import { useEffect, useState } from "react";

export const Search = () => {
  const [hydrated, setHydrated] = useState(false);
  console.log("Hello from Search !");
  useEffect(() => {
    console.log("client-side render");
    if (!hydrated) {
      setTimeout(() => {
        setHydrated(true);
      }, 2000);
    }
  }, [hydrated]);
  return (
    <div>
      Search component - a Server-side rendered React ModuleFederation component
      {hydrated && " - with hydration 😎  !"}
    </div>
  );
};

export default Search;
