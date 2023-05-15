import { PasswordInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Auth/authHelpers";

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const submitFunction = (e) => {
    const form = e.target;
    const formData = new FormData(form);
    const oldPassword = formData.get("old-password");
    const newPassword = formData.get("new-password");
    const confirmNewPassword = formData.get("confirm-new-password");
    console.log(oldPassword, newPassword, confirmNewPassword);

    if (newPassword === confirmNewPassword) {
      axios
        .put(
          `${process.env.REACT_APP_API}/user/change-password`,
          {
            oldPassword,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        )
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
    <div className="container mx-auto flex justify-center items-center flex-col">
      <h1>ChangePassword Page</h1>
      <p>Welcome to the ChangePassword page!</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFunction(e);
        }}
        className="flex justify-center items-center flex-col gap-4 w-60 my-10"
      >
        <PasswordInput
          className="w-full"
          name="old-password"
          placeholder="Old Password"
        />
        <PasswordInput
          className="w-full"
          name="new-password"
          placeholder="New Password"
        />
        <PasswordInput
          className="w-full"
          name="confirm-new-password"
          placeholder="Conirm New Password"
        />

        <button
          type="submit"
          className="py-2 w-full rounded-sm bg-blue-500 text-white font-medium"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};
export default ChangePasswordPage;
