import config from "~/config";

import Home from "~/pages/Home";
import Auth from "~/pages/Auth";

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
