import { privateApi } from "../api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
const useAxiosPrivate = () => {
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const refreshToken = useRefreshToken();
  console.log("accestoekn=", accessToken);

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const responseIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("error", error);

        const prevrequest = error?.config;
        console.log("prevrequest", prevrequest);
        if (error?.response?.status === 403 && !prevrequest?.sent) {
          prevrequest.sent = true;
          const newAccessToken = await refreshToken();
          console.log("new accessToken ", newAccessToken.data.data);

          prevrequest.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken.data.data}`;
          return privateApi(prevrequest);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      privateApi.interceptors.response.eject(responseIntercept);
      privateApi.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken, refreshToken]);

  return privateApi;
};

export default useAxiosPrivate;
