import { SET_MODAL } from "./types";

export function setModal(open) {
  return (dispatch) => {
    dispatch({
      type: SET_MODAL,
      payload: open,
    });
  };
}
