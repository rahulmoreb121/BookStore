/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
const Auth = ({ isSignup = false, loginOrRegister, serverError }) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [userNameError, setuserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = () => {
    if (!userName) {
      setuserNameError("userName is required");
      if (password) setPasswordError("");
      if (email) setEmailError("");
    }
    if (!password) {
      setPasswordError("password is required");
      if (userName) setuserNameError("");
      if (email) setEmailError("");
    }
    if (!email) {
      setEmailError("email is required");
      if (userName) setuserNameError("");
      if (password) setPasswordError("");
    }
    if (!isSignup) {
      if (userName && password) {
        loginOrRegister({ userName, password });
        setuserName("");
        setPassword("");
        setuserNameError("");
        setPasswordError("");
      }
    }
    if (isSignup) {
      if (userName && password && email) {
        loginOrRegister({ userName, password, email });
        setuserName("");
        setPassword("");
        setEmail("");
        setuserNameError("");
        setPasswordError("");
        setEmailError("");
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className="userName">
        <input
          type="text"
          name="userName"
          placeholder="userName"
          value={userName}
          autoComplete="off"
          onChange={(e) => setuserName(e.target.value)}
        />
        {userNameError && <div className={styles.error}>{userNameError}</div>}
      </div>
      {isSignup && (
        <div className="email">
          <input
            autoComplete="false"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && isSignup && (
            <div className={styles.error}>{emailError}</div>
          )}
        </div>
      )}
      <div className="password">
        <input
          autoComplete="false"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}
      </div>
      <div className={styles.forgot}>
        <Link>Forgot password?</Link>
      </div>
      {serverError && (
        <div className={styles.error + " " + styles.server_error}>
          {serverError}
        </div>
      )}
      <div className={styles.button}>
        <button
          className={isSignup ? `${styles["signup"]}` : `${styles["signin"]}`}
          onClick={onSubmit}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </div>
      
    </div>
  );
};

export default Auth;
