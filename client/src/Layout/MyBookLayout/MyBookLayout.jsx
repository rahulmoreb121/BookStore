import { Outlet } from "react-router-dom";
import MyBookNavbar from "../../components/mybooknavbar/MyBookNavbar";

const MyBookLayout = () => {
  return (
    <>
      <MyBookNavbar />
      <Outlet />
    </>
  );
};

export default MyBookLayout;
