import { useState } from "react";
import Auth from "../components/Auth/Auth";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signup = async (data) => {
    console.log("signup", data);
    try {
      let response = await api.post("/auth/register", data);
      console.log(response);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("errror", err);
      setError(err.response.data.message);
    }
  };

  return <Auth isSignup={true} loginOrRegister={signup} serverError={error} />;
};

export default Signup;
