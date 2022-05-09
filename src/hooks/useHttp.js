import { useReducer, useCallback } from "react";
import { rejectTooLongRequest } from "../helpers/helpers";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "loading",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.rData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.message,
      status: "completed",
    };
  }

  if (action.type === "CLEAR") {
    return {
      data: null,
      error: null,
      status: null,
    };
  }

  return state;
}

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: null,
    data: null,
    error: null,
  });

  const clearError = () => dispatch({ type: "CLEAR" });

  const sendRequest = useCallback(async (url, methodOptionsObject = {}) => {
    dispatch({ type: "SEND" });
    try {
      const response = await Promise.race([
        rejectTooLongRequest(),
        fetch(url, methodOptionsObject),
      ]);

      const rData = await response.json();

      if (!response.ok) throw rData;

      dispatch({ type: "SUCCESS", rData });
    } catch ({ message }) {
      dispatch({
        type: "ERROR",
        message,
      });
    }
  }, []);

  return {
    clearError,
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
