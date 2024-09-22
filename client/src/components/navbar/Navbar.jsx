import { Link, NavLink, useNavigate } from "react-router-dom";
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
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
          to={"mybooks"}
        >
          My Books
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
          to={"about"}
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
          to={"logout"}
        >
          <div onClick={logout}>Logout</div>
        </NavLink>
      </div>
    </section>
  );
};

export default Navbar;
