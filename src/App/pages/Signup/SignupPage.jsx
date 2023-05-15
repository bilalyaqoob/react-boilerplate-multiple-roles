import React from "react";
import Form from "./signupComponents/Form";
import { isAuth } from "../../Auth/authHelpers";
import { Navigate } from "react-router-dom";

const SignupPage = () => {
  if (isAuth()) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="py-10">
        <Form />
      </div>
    );
  }
};
export default SignupPage;
