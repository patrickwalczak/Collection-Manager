import "bootstrap/dist/css/bootstrap.min.css";

import FormWrapper from "../UI/FormWrapper";
import SignInForm from "../Components/LogInForm";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { FormattedMessage } from "react-intl";

const Login = () => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const { logIn, theme } = useContext(AppContext);

  const navigate = useNavigate();

  const signInUser = async () => {
    try {
      const loggedUserAccount = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: "POST",
          body: JSON.stringify(submittedFormData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!loggedUserAccount) throw "";

      logIn(loggedUserAccount);
      resetHookState();
      setFormData(null);
      navigate(`/user/${loggedUserAccount.userId}`);
    } catch (err) {
      setFormData(null);
    }
  };

  useEffect(() => {
    if (!submittedFormData) return;
    signInUser();
  }, [submittedFormData]);

  return (
    <FormWrapper>
      <h2 className=" mb-3 text-center fs-1">
        <FormattedMessage id="app-navigation.login.button" />
      </h2>
      <SignInForm
        theme={theme}
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
      />
    </FormWrapper>
  );
};

export default Login;
