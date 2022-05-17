import "bootstrap/dist/css/bootstrap.min.css";

import FormWrapper from "../UI/FormWrapper";
import SignInForm from "./SignInForm";

import useHttp from "../hooks/useHttp";
import AppContext from "../store/app-context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const Login = () => {
  const [submittedFormData, setFormData] = useState(null);

  const { requestError, requestStatus, sendRequest, resetHookState } =
    useHttp();

  const { logIn } = useContext(AppContext);

  const navigate = useNavigate();

  const signInUser = async () => {
    try {
      const loggedUserAccount = await sendRequest(
        "http://localhost:5000/api/users/login",
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
      <h2 className="mb-3 text-center fs-1">SIGN IN</h2>
      <SignInForm
        requestError={requestError}
        requestStatus={requestStatus}
        resetHookState={resetHookState}
        setFormData={setFormData}
      />
    </FormWrapper>
  );
};

export default Login;
