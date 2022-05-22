import "bootstrap/dist/css/bootstrap.min.css";

import SignUpForm from "../Components/SignUpForm/index";
import FormWrapper from "../UI/FormWrapper";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { FormattedMessage } from "react-intl";

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
      <SignUpForm
        theme={theme}
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
      />
    </FormWrapper>
  );
};

export default SignUp;
