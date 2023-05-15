import React from "react";

import { isAuth } from "../../Auth/authHelpers";
import { Link } from "react-router-dom";
import AppIcons from "../../../@core/AppIcon/AppIcon";
const ProfilePage = () => {
  const user = isAuth();
  return (
    <div className="container relative">
      <Link
        to={"/settings"}
        className="absolute right-5 top-5 flex gap-2 hover:scale-105 transform"
      >
        Edit
        <AppIcons icon={"PencilSquareIcon:solid"} className={"w-5 h-5"} />
      </Link>
      <div className="flex flex-col py-32 items-center justify-center ">
        <h1>
          <span className="font-bold text-green-400">{user.name}</span> Profile
        </h1>
        <p>Welcome to the Profile page!</p>
      </div>
    </div>
  );
};
export default ProfilePage;
