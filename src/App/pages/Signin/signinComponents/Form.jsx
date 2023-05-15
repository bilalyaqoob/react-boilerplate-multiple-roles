import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Loader, Divider } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../../Auth/authHelpers";
import GoogleButtonComponent from "./GoogleButtonComponent";
// import FacebookButtonComponent from "./FacebookButtonComponent";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 character" : null,
    },
  });

  const signinMethod = async (values) => {
    const { email, password } = values;
    setLoading(true);

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
      },
    };

    axios
      .post(`${process.env.REACT_APP_API}/login`, { email, password }, options)
      .then((res) => {
        setLoading(false);
        form.reset();
        authenticate(res, () => {
          navigate("/");
          showNotification({
            message: `Hey ${res.data.user.name}, Welcome Back`,
            color: "blue",
          });
        });
      })
      .catch((err) => {
        setLoading(false);
        showNotification({ message: err.response.data.error, color: "red" });
      });
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={form.onSubmit((values) => {
          signinMethod(values);
        })}
      >
        <TextInput
          mt="xs"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="xs"
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Link to="/auth/forget-password" className="text-blue-500 text-sm my-2">
          Forget Password
        </Link>

        <button
          className="py-3 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white my-4 flex items-center justify-center "
          type="submit"
          disabled={loading}
          mt="sm"
        >
          {loading ? <Loader size={"sm"} /> : "SignIn"}
        </button>
        <hr className="my-4 w-60 inline-block" />
        <div className="flex flex-col gap-2">
          <GoogleButtonComponent />
          {/* <FacebookButtonComponent /> */}
        </div>
      </form>
    </div>
  );
};
export default Form;
