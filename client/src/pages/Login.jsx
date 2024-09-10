import { useState } from "react";
import Auth from "../components/Auth/Auth";
import api from "../api/axios.js";
import { userLogin } from "../store/slices/AuthSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (data) => {
    try {
      let response = await api.post("/auth/login", data, {
        withCredentials: true,
      });
      dispatch(userLogin(response.data.data));
      navigate("/", { replace: true });
    } catch (err) {
      console.log("Login error", err);
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return <Auth isSignup={false} loginOrRegister={login} serverError={error} />;
};

export default Login;
