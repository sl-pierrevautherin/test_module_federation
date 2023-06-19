import { useEffect, useState } from "react";

export const Search = () => {
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
    <div>
      Search component - a Client-rendered React ModuleFederation component{" "}
      {hydrated && "- hydrated !!"}
    </div>
  );
};

export default Search;
