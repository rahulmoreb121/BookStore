import { useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PersistUser = () => {
  const refresh = useRefreshToken();
  const accessToken = useSelector((state) => state.authreducer.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const persistUser = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
        navigate("/login", { replace: true });
        dispatch(userLogout());
      }
    };
    if (!accessToken) {
      persistUser();
    }
  }, []);
  return <>{accessToken && <Outlet />}</>;
};

export default PersistUser;
