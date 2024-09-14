import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { privateApi } from "../../api/axios";
import { userLogout } from "../../store/slices/AuthSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    console.log("logout");

    try {
      await privateApi.get("/auth/logout", {
        withCredentials: true,
      });

      dispatch(userLogout());
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("Login error", err);
    }
  };
  return (
    <section className={styles.main}>
      <div className={styles.left}>My Book Store</div>
      <div className={styles.right}>
        <Link to={"/"}>Home</Link>
        <Link to={"mybooks"}>My Books</Link>
        <Link to={"about"}>About</Link>
        <div className={styles.logout} onClick={logout}>
          Logout
        </div>
      </div>
    </section>
  );
};

export default Navbar;
