import type { classifiedId, classified } from "./types";

export const getServerSideProps = async (classifiedId: classifiedId) => {
  const response: classified = {
    id: classifiedId,
    data: "some classified async data",
  };
  return await setTimeout(() => response, 600);
};
