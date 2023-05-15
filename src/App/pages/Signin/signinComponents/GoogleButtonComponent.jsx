import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { authenticate } from "../../../Auth/authHelpers";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

const GoogleButtonComponent = () => {
  const navigate = useNavigate();

  const sendGoogleTokenToBackend = (idToken) => {
    console.log(idToken);
    axios
      .post(`${process.env.REACT_APP_API}/google-auth`, { idToken })
      .then((res) => {
        authenticate(res, () => {
          navigate("/");
          showNotification({
            message: `Hey ${res.data.user.name}, Welcome Back`,
            color: "blue",
          });
        });
      })
      .catch((err) => {
        showNotification({ message: err.response.data.error, color: "red" });
      });
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          sendGoogleTokenToBackend(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleButtonComponent;
