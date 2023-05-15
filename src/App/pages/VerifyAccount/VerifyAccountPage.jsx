import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

const VerifyAccountPage = () => {
  const { token } = useParams();
  const { name } = async () => await jwtDecode(token);
  console.log(name);
  const navigate = useNavigate();

  const ActiveMethod = async () => {
    axios
      .post(`${process.env.REACT_APP_API}/verify-account`, { token })
      .then((res) => {
        console.log("Doneeeeeee");
        showNotification({ message: res.data.message, color: "green" });
        navigate("/signin");
      })
      .catch((err) => {
        console.log("Errrrorrrrrrr");
        showNotification({ message: err.response.data.error, color: "red" });
        navigate("/signup");
      });
  };

  return (
    <div className="text-center mx-20 break-words my-32">
      <h1 className="text-xl">
        Hi {name} <br /> are you ready to start your journy with us ?
      </h1>
      <button
        onClick={() => ActiveMethod()}
        className="bg-blue-300 text-white font-bold p-4 my-10"
      >
        Click To Active Your Account
      </button>
    </div>
  );
};

export default VerifyAccountPage;
