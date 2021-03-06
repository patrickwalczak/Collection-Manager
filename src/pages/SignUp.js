import "bootstrap/dist/css/bootstrap.min.css";

import AuthForm from "../Components/AuthForm/index";
import FormWrapper from "../common/UI/FormWrapper";

import { FormattedMessage } from "react-intl";

import useHttp from "../shared/hooks/useHttp";
import AppContext from "../shared/context/app-context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const SignUp = () => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState, theme } =
    useHttp();

  const { logIn } = useContext(AppContext);

  const navigate = useNavigate();

  const signUpUser = async () => {
    try {
      const createdUserAccount = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          method: "POST",
          body: JSON.stringify(submittedFormData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!createdUserAccount) throw "";

      logIn(createdUserAccount);
      resetHookState();
      setFormData(null);
      navigate(`/user/${createdUserAccount.userId}`);
    } catch (err) {
      setFormData(null);
    }
  };

  useEffect(() => {
    if (!submittedFormData) return;
    signUpUser();
  }, [submittedFormData]);
  return (
    <FormWrapper>
      <h2 data-theme={theme} className="inputViewStyle mb-3 text-center fs-1">
        <FormattedMessage id="app-navigation.signup.button" />
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
          username: "",
        }}
        signUpForm={true}
      />
    </FormWrapper>
  );
};

export default SignUp;
