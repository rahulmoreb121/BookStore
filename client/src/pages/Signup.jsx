import { useState } from "react";
import Auth from "../components/Auth/Auth";

const Signup = () => {
  const [error, setError] = useState(null);
  const signup = (data) => {
    console.log("signup", data);
    setError("hello")
  };

  return <Auth isSignup={true} loginOrRegister={signup} serverError={error} />;
};

export default Signup;
