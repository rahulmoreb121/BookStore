import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <section className={styles.main}>
      <div className={styles.left}>My Book Store</div>
      <div className={styles.right}>
        <Link to={"/"}>Home</Link>
        <Link to={"/mybooks"}>My Books</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/"}>Logout</Link>
      </div>
    </section>
  );
};

export default Navbar;
