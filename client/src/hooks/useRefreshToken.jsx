import { useDispatch } from "react-redux";
import api from "../api/axios.js";
import { userLogin, userLogout } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await api.get("/refreshToken", {
        withCredentials: true,
      });
      dispatch(userLogin(response.data.data));
      return response.data.data;
    } catch (error) {
      console.log(error);
      dispatch(userLogout());
      navigate("/login");
      return error;
    }
  };

  return refresh;
};

export default useRefreshToken;
