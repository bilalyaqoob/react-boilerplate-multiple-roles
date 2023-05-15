import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { Loader, TextInput } from "@mantine/core";
import {
  getCookie,
  isAuth,
  setLoaclStorage,
  signOut,
} from "../../../Auth/authHelpers";
import { useNavigate } from "react-router-dom";
const EditForm = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState();
  const navigate = useNavigate();

  // Fetch the user Data Here

  const getUserData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setUserName(res.data.name);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          signOut(() => {
            navigate("/");
          });
        } else {
          navigate("/profile");
        }
      });
  };

  useEffect(() => {
    getUserData();
  }, [navigate]);

  const form = useForm({
    // initialValues: { ...userData },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const updateName = () => {
    console.log("userame", userName);

    axios
      .put(
        `${process.env.REACT_APP_API}/user/update`,
        {
          name: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        getUserData();
        setLoaclStorage("user", res.data.user);
        showNotification({
          message: "User Updated Successfully",
          color: "green",
        });
      })
      .catch((err) => {
        showNotification({ message: "err.response.data.error", color: "red" });
      });
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateName();
        }}
      >
        <TextInput
          mt="xs"
          label="Name"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          defaultValue={userName}
        />
        <TextInput
          disabled
          mt="xs"
          label="Email"
          placeholder="Email"
          defaultValue={userData?.email}
          {...form.getInputProps("email")}
        />

        <TextInput
          disabled
          mt="xs"
          label="Role"
          placeholder="Role"
          defaultValue={userData?.role}
          {...form.getInputProps("email")}
        />

        <button
          className="py-3 w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white my-4 flex items-center justify-center "
          type="submit"
          disabled={loading}
          mt="sm"
        >
          {loading ? <Loader size={"sm"} /> : "Update"}
        </button>
      </form>
    </div>
  );
};
export default EditForm;
