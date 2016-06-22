import fetch from 'isomorphic-fetch';

export const RECEIVE_HASHTAGS = 'RECEIVE_HASHTAGS';

function handleErrors(response) {
  const { status } = response;
  if (status >= 200 && status < 400) {
    return response.json();
  } else {
    throw new Error(`Request failed (${status})`);
  }
}

export const request = () => dispatch => {
  fetch(`/api/hashtags`)
    .then(handleErrors)
    .then(data => {
      dispatch({
        type: RECEIVE_HASHTAGS,
        data
      });
    });
};