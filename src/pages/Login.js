import "bootstrap/dist/css/bootstrap.min.css";

import FormWrapper from "../common/UI/FormWrapper";
import AuthForm from "../Components/AuthForm/index";

import { FormattedMessage } from "react-intl";

import useHttp from "../hooks/useHttp";
import AppContext from "../shared/context/app-context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

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
      <AuthForm
        theme={theme}
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
        initialValues={{
          email: "",
          password: "",
        }}
        signUpForm={false}
      />
    </FormWrapper>
  );
};

export default Login;
