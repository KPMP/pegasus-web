import Api from '../../helpers/Api';

const api = Api.getInstance();


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
      api.post('/explorer/v1/error', error)
      .then(res=> {
        if (useRedirect) {
          dispatch(handleError(error));
        } else {
          dispatch(handleErrorWithoutRedirect(error));
        }
      });
  }

};
