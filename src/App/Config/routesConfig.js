import React from "react";
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/Admin/AdminPage";
import SubscriberPage from "../pages/Subscriber/SubscriberPage";
import authRoles from "../Auth/authRoles";
import SettingsPage from "../pages/Settings/SettingsPage";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage";

const routesConfig = [
  {
    path: "/",
    element: <HomePage />,
    auth: authRoles.All,
  },

  {
    path: "/subscriber",
    element: <SubscriberPage />,
    auth: authRoles.Subscriber,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    auth: authRoles.Admin,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    auth: authRoles.All,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    auth: authRoles.All,
  },
  {
    path: "/settings/change-password",
    element: <ChangePasswordPage />,
    auth: authRoles.All,
  },
  // {
  //   path: "/auth/activate/:token",
  //   element: <VerifyAccountPage />,
  //   auth: authRoles.All,
  // },
];

export default routesConfig;
