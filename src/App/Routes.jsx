import React, { Fragment } from "react";
import { Route, Routes as SwitchRoutes } from "react-router-dom";
import SignupPage from "./pages/Signup/SignupPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SigninPage from "./pages/Signin/SigninPage";
import routesConfig from "./Config/routesConfig";
// import { useRoutes } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import VerifyAccountPage from "./pages/VerifyAccount/VerifyAccountPage";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";

function Routes() {
  // const routing = useRoutes(routesConfig);

  return (
    <SwitchRoutes>
      {routesConfig.map((route, index) => {
        return (
          <Route
            key={route.path}
            element={<PrivateRoute authRoles={route.auth} />}
          >
            <Route exact path={route.path} element={route.element} />
          </Route>
        );
      })}

      <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/auth/activate/:token" element={<VerifyAccountPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/access-denied" component={AccessDeniedPage} /> */}
      <Route path="*" component={NotFoundPage} />
    </SwitchRoutes>
  );
}

export default Routes;
