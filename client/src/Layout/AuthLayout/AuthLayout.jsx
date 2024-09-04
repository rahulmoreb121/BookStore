import { NavLink, Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AuthLayout = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  return (
    <div className={styles.main}>
      <div className={styles.tab}>
        <div className={styles.menu}>
          <div className={styles.underline}>
            <NavLink
              to="/login"
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
          {!accessToken ? (
            <>
              <Outlet />
            </>
          ) : (
            <Navigate to={"/"} replace={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
