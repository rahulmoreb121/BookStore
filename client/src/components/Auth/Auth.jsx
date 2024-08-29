/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
const Auth = ({ isSignup = false, loginOrRegister, serverError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = () => {
    if (!username) {
      setUsernameError("username is required");
      if (password) setPasswordError("");
      if (email) setEmailError("");
    }
    if (!password) {
      setPasswordError("password is required");
      if (username) setUsernameError("");
      if (email) setEmailError("");
    }
    if (!email) {
      setEmailError("email is required");
      if (username) setUsernameError("");
      if (password) setPasswordError("");
    }
    if (!isSignup) {
      if (username && password) {
        loginOrRegister({ username, password });
        setUsername("");
        setPassword("");
        setUsernameError("");
        setPasswordError("");
      }
    }
    if (isSignup) {
      if (username && password && email) {
        loginOrRegister({ username, password, email });
        setUsername("");
        setPassword("");
        setEmail("");
        setUsernameError("");
        setPasswordError("");
        setEmailError("");
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className="username">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <div className={styles.error}>{usernameError}</div>}
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
