import { useReducer, useCallback } from "react";
import { rejectTooLongRequest } from "../helpers/helpers";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      requestError: null,
      requestStatus: "loading",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      requestError: null,
      requestStatus: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      requestError: action.message,
      requestStatus: "completed",
    };
  }

  if (action.type === "CLEAR") {
    return {
      requestError: null,
      requestStatus: null,
    };
  }

  return state;
}

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    requestStatus: null,
    requestError: null,
  });

  const resetHookState = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const sendRequest = async (url, methodOptionsObject = {}) => {
    dispatch({ type: "SEND" });
    try {
      const response = await Promise.race([
        rejectTooLongRequest(),
        fetch(url, methodOptionsObject),
      ]);

      const responseData = await response.json();

      if (!response.ok) throw responseData;

      dispatch({ type: "SUCCESS" });
      return responseData;
    } catch ({ message }) {
      dispatch({
        type: "ERROR",
        message,
      });
    }
  };

  return {
    resetHookState,
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
