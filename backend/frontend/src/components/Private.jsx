import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Private() {
  const { userinfo } = useSelector((state) => state.auth);

  return userinfo ? <Navigate to="/chat" replace={true} /> : <Outlet></Outlet>;
}

export default Private;
