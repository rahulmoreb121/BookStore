import { NavLink } from "react-router-dom";
import styles from "./MyBookNavbar.module.css";
const MyBookNavbar = () => {
  return (
    <section className={styles.main}>
      <div className={styles.right}>
        <NavLink
          to={"mybooks"}
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
        >
          All Books
        </NavLink>
        <NavLink
          to={"book"}
          className={({ isActive }) =>
            isActive ? `${styles["active"]}` : `${styles["inactive"]}`
          }
        >
          Add New Book
        </NavLink>
      </div>
    </section>
  );
};

export default MyBookNavbar;
