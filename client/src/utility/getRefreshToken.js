import api from "../api/axios.js";
import { userLogin } from "../store/slices/AuthSlice.js";
import { store } from "../store/store.jsx";

export const getRefreshToken = async () => {
  try {
    const response = await api.get("/refreshToken", {
      withCredentials: true,
    });
    console.log("serrrrrrrrrrrrrrrrrrrrrrrr",response);
    store.dispatch(userLogin(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
