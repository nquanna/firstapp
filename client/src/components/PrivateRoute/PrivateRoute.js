import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import config from "~/config";

import { AuthContext } from "~/contexts";

function PrivateRoute({ children }) {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = useRef(false);

  useEffect(() => {
    const autoLoadUser = async () => {
      const { success } = await loadUser(true);
      !success && navigate(config.routes.login);
      isAuthenticated.current = success;
    };
    autoLoadUser();

    // eslint-disable-next-line
  }, []);

  return <>{isAuthenticated.current && children}</>;
}

export default PrivateRoute;
