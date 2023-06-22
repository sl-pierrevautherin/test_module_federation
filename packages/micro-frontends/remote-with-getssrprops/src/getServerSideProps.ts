import type { classifiedId, classified } from "./types";

export const getServerSideProps = (classifiedId: classifiedId) => async () => {
  const response: classified = {
    data: "some classified async data",
  };
  return await new Promise((resolve) =>
    setTimeout(() => resolve(response), 600)
  );
};
