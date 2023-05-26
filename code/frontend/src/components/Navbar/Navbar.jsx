import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
function Navbar() {

    const isAuthenticated = false;

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>
          Shammaas
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/crypto"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          CryptoCurriencies
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/submit"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Submit a Blog
        </NavLink>
        {isAuthenticated ? <div><NavLink><button className={styles.signOutButton}>Sign Out</button></NavLink></div>
            :
            <div>
            <NavLink
            to="/log-in"
            className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
            }
            >
            <button className={styles.logInButton}>Log In</button>
            </NavLink>
            <NavLink
            to="/sign-up"
            className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
            }
            >
            <button className={styles.signUpButton}>Sign Up</button>
            </NavLink>
        </div>}
      </nav>
      <div className={styles.separator}></div>
    </>
  );
}
export default Navbar;
