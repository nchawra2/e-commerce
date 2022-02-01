import { AuthUtil } from "./AuthUtil";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  if (AuthUtil.isLoggedIn()) {
    return children;
  }

  return <Navigate to="/user/login" />;
};
