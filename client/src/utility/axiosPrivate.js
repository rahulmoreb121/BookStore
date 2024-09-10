import { privateApi } from "../api/axios";
import { getRefreshToken } from "./getRefreshToken";
import { store } from "../store/store";
const axiosPrivate = async () => {
  console.log("inside axios private");

  const requestIntercept = privateApi.interceptors.request.use(
    (config) => {
      console.log("inside request", config);

      if (!config.headers["Authorization"]) {
        const accessToken = store.getState().authreducer.accessToken;
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
      console.log("error from axios privaets", error);

      const prevrequest = error?.config;
      console.log("prevrequest", prevrequest);
      if (error?.response?.status === 403 && !prevrequest?.sent) {
        prevrequest.sent = true;
        const newAccessToken = await getRefreshToken();
        prevrequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return privateApi(prevrequest);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const ejectRequests = () => {
    privateApi.interceptors.response.eject(responseIntercept);
    privateApi.interceptors.request.eject(requestIntercept);
  };

  return { privateApi, ejectRequests };
};

export { axiosPrivate };
