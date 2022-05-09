import "bootstrap/dist/css/bootstrap.min.css";

import SignUpForm from "./SignUpForm";
import FormWrapper from "../UI/FormWrapper";

const SignUp = () => {
  return (
    <FormWrapper>
      <h2 className="mb-3 text-center fs-1">SIGN UP</h2>
      <SignUpForm />
    </FormWrapper>
  );
};

export default SignUp;

//https://localhost:5000/api/users/signup, // {  method: "PATCH",
//   body: JSON.stringify(),
//   headers: {
//     "Content-Type": "application/json",
//   }
// }

// s@d.dd
