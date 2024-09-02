import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
const ProtectedRouteLayout = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);

  return accessToken ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"login"} replace={true} />
  );
};

export default ProtectedRouteLayout;
