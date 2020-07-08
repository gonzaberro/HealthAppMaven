import { ERROR_MESSAGE } from "./types";

export function setErrorMessage(error) {
  return (dispatch) => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: error,
    });
  };
}
