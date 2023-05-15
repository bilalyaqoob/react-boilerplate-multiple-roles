import React from "react";
import { PasswordInput } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const resetPassword = (e) => {
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password === confirmPassword) {
      axios
        .post(`${process.env.REACT_APP_API}/user/reset-password`, {
          password,
          token,
        })
        .then((res) => {
          showNotification({
            message:
              "Password Changed Successfully, Please signin with your new password",
          });
          navigate("/signin");
        })
        .catch((err) => {
          console.log(err);
          showNotification({ message: err.response.data.error, color: "red" });
        });
    } else {
      showNotification({ message: "Password Not Matched", color: "red" });
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center flex-col gap-6 p-10">
      <h1>Reset Your Password</h1>
      <p>Please add your new password</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword(e);
        }}
        className="w-72 flex py-10 flex-col justify-center items-center gap-4"
      >
        <PasswordInput
          name="password"
          id={"password"}
          placeholder="Enter Your Password"
          className="w-full"
        />
        <PasswordInput
          name="confirm-password"
          id={"confirm-password"}
          placeholder="Confirm Your Password"
          className="w-full"
        />
        <button
          className="py-2 px-6 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Reset My Password
        </button>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
