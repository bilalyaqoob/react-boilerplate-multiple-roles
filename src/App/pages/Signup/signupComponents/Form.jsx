import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Loader } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import GoogleButtonComponent from "../../Signin/signinComponents/GoogleButtonComponent";
import FacebookButtonComponent from "../../Signin/signinComponents/FacebookButtonComponent";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 character" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const signupMethod = async (values) => {
    const { name, email, password } = values;
    setLoading(true);

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API}/signup`,
        { name, email, password },
        options
      )
      .then((res) => {
        setLoading(false);
        showNotification({
          message: `Done, email have been sent to (${email}), please follow the instruture`,
          color: "green",
        });
        form.reset();
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
          signupMethod(values);
        })}
      >
        <TextInput
          mt="xs"
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
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

        <PasswordInput
          mt="xs"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <button
          className="py-3 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white my-4 flex items-center justify-center "
          type="submit"
          disabled={loading}
          mt="sm"
        >
          {loading ? <Loader size={"sm"} /> : "Submit"}
        </button>
        <hr className="my-4 w-60 inline-block" />
        <div className="flex flex-col gap-2">
          <GoogleButtonComponent />
          <FacebookButtonComponent />
        </div>
      </form>
    </div>
  );
};
export default Form;
