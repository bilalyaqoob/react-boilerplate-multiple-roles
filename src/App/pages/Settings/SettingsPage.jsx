import React from "react";
import { Link } from "react-router-dom";
import EditForm from "./EditForm/EditForm";
const SettingsPage = () => {
  return (
    <div className="container mx-auto flex justify-center items-center flex-col ">
      <h1>Settings Page</h1>
      <p>Welcome to the Settings page!</p>
      <div className="mt-4">
        <EditForm />
      </div>
      <Link
        to="change-password"
        className=" bg-red-500 text-sm text-white font-bold px-6 py-1 my-4 rounded-full"
      >
        Change My Password
      </Link>
    </div>
  );
};
export default SettingsPage;
