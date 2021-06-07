export const handleError = (error) => {
  return dispatch => {
    console.log(error)
    window.location.href = '/oops';
  };
};

export const handleErrorWithoutRedirect = (error) => {
  return dispatch => {
    console.log(error)
  };
};

export const sendMessageToBackend = (error, useRedirect = true) => {
  return dispatch => {
    if (useRedirect) {
      dispatch(handleError(error));
    } else {
      dispatch(handleErrorWithoutRedirect(error));
    }

  }
  // Uncomment this section once you have an api to send errors to
  //	return (dispatch) => {
  //		api.post('/api/v1/error', errorMessage)
  //		.then(res=> {
  //			 dispatch(handleError());
  //		});
  //	};
};