import { baseURL } from '../../../package.json'

export const handleError = (error) => {
  return dispatch => {
    console.log(error)
    window.location.href = baseURL + '/oops';
  };
};

export const sendMessageToBackend = error => {
  return dispatch => {
    dispatch(handleError(error));
  }
  // Uncomment this section once you have an api to send errors to
  //	return (dispatch) => {
  //		api.post('/api/v1/error', errorMessage)
  //		.then(res=> {
  //			 dispatch(handleError());
  //		});
  //	};
};
