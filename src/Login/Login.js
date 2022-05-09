import "bootstrap/dist/css/bootstrap.min.css";
import FormWrapper from "../UI/FormWrapper";

import SignInForm from "./SignInForm";

const Login = () => {
  return (
    <FormWrapper>
      <h2 className="mb-3 text-center fs-1">SIGN IN</h2>
      <SignInForm />
    </FormWrapper>
  );
};

export default Login;
