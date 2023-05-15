import React from "react";
import { TextInput } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
const ForgetPasswordPage = () => {
  const navigate = useNavigate();

  const sendLink = (e) => {
    const formData = new FormData(e.currentTarget);
    console.log(`formData.get("email")`, formData.get("email"));
    axios
      .post(`${process.env.REACT_APP_API}/user/forget-password`, {
        email: formData.get("email"),
      })
      .then((res) => {
        showNotification({ message: res.data.message });
        navigate("/signin");
      })
      .catch((err) => {
        showNotification({ message: err.response.data.error, color: "red" });
      });
  };

  return (
    <div className="container mx-auto flex items-center justify-center flex-col gap-6 p-10">
      <h1>Enter Your Email here</h1>
      <p>
        Enter your email here and we will wend a reset password link to yor
        email
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendLink(e);
        }}
        className="w-72 flex py-10 flex-col justify-center items-center gap-4"
      >
        <TextInput
          name="email"
          id={"email"}
          placeholder="Enter Your Email"
          className="w-full"
        />
        <button
          className="py-2 px-6 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Send Link to my Email
        </button>
      </form>
    </div>
  );
};
export default ForgetPasswordPage;
