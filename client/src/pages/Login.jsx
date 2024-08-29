import { useState } from "react";
import Auth from "../components/Auth/Auth";

const Login = () => {
  const [error, setError] = useState(null);
  const login = (data) => {
    console.log("login", data);
    setError("Hello login")
  };
  
  return <Auth isSignup={false} loginOrRegister={login} serverError={error} />;
};

export default Login;
