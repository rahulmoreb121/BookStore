import { NavLink, Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout = () => {
  return (
    <div className={styles.main}>
      <div className={styles.tab}>
        <div className={styles.menu}>
          <div className={styles.underline}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles["active"]}` : `${styles["inactive"]}`
              }
            >
              Sign In
            </NavLink>
          </div>
          <div className={styles.underline}>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? `${styles["active"]}` : `${styles["inactive"]}`
              }
            >
              Sign Up
            </NavLink>
          </div>
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
