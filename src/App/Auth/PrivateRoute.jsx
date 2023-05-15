import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuth } from "./authHelpers";

const PrivateRoute = ({ authRoles = [] }) => {
  const user = isAuth();
  const location = useLocation();

  if (user) {
    return authRoles.includes(user.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
