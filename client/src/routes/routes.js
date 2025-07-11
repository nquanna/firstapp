import config from "~/config";

import Home from "~/pages/HomePage";
import Auth from "~/pages/AuthPage";

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
    props: {},
  },
  {
    path: config.routes.login,
    component: Auth,
    props: {
      routerPath: "/login",
    },
  },
  {
    path: config.routes.register,
    component: Auth,
    props: {
      routerPath: "/register",
    },
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
