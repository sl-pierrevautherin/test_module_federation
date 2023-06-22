export const Remote = ({ id, data }) => {
  return (
    <>
      <div>
        Remote component - a ModuleFederation component with getServerSideProps
      </div>
      <div>id: {id}</div>
      <div>bffData: {JSON.stringify(data)}</div>
    </>
  );
};

export default Remote;
