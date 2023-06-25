import React from "react";
import Pr from 'prop-types';

const getAPICallInitialState = () => null;

const getAPICallLoadingState = () => ({
  isFetching: true,
  data: null,
  errorMessage: ""
});

const getAPICallErrorState = (err) => {
  // hey log this object and observe what functionalities you are getting
  return {
    isFetching: false,
    data: null,
    errorMessage: err.message || 'Something went wrong'
  }
};

const getAPICallSuccessState = (data) => ({
  isFetching: false,
  data,
  errorMessage: ""
});

export const People = ({ id }) => {
  const [reqState, setRequestState] = React.useState(getAPICallInitialState());

  React.useEffect(() => {
    if (!id) {
      setRequestState(getAPICallInitialState());
      return;
    }
    setRequestState(getAPICallLoadingState());
    fetch(`https://swapi.dev/api/people/${id}`)
      .then(res => res.json())
      .then(res => setRequestState(getAPICallSuccessState(res)))
      .catch(err => setRequestState(getAPICallErrorState(err)));

  }, [id]);

  let content = null;
  console.log(reqState);  

  if (!id) {
    content = <h2>No need to fetch data</h2>;
  } else if (reqState?.isFetching) {
    content = <h2>Loading ...</h2>;
  } else if (reqState?.errorMessage) {
    content = <Error message={reqState.errorMessage} />;
  } else if (reqState?.data) {
    content = <pre>{JSON.stringify(reqState.data, "", 2)}</pre>
  }
  return (
    <div>
      {id ? <h1>{id}</h1> : null}
      {content}
    </div>
  );
};

const Error = ({ message }) => {
  return (<div style={{ color: 'red', padding: '1rem' }}>
    <h3>{message}</h3>
  </div>);
}
Error.propTypes = {
  message: Pr.string
}
Error.defaultProps = {
  message: 'Something went wrong',
}