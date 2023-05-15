import React from "react";
import Form from "./signinComponents/Form";
import { isAuth } from "../../Auth/authHelpers";
import { Navigate } from "react-router-dom";

const SigninPage = () => {
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
export default SigninPage;
