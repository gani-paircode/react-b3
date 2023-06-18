import React from "react";

const getInitialState = () => null;

const getLoadingState = () => ({
  isFetching: true,
  data: null,
  errorMessage: ""
});

const getErrorState = (errorMessage) => ({
  isFetching: false,
  data: null,
  errorMessage
});

const getSuccessState = (data) => ({
  isFetching: false,
  data,
  errorMessage: ""
});

const People = ({ id }) => {
  const [reqState, setRequestState] = React.useState(getInitialState());

  React.useEffect(() => {
    if (!id) {
      setRequestState(getInitialState());
      return;
    }
    setRequestState(getLoadingState());
  }, [id]);
  return (
    <div>
      <h1>{id}</h1>
      {!id ? <h2>No need to fetch data</h2> : null}
    </div>
  );
};

export default People;
