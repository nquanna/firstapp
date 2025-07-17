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
      routerPath: "/auth/login",
    },
  },
  {
    path: config.routes.register,
    component: Auth,
    props: {
      routerPath: "/auth/register",
    },
  },
  {
    path: config.routes.forgotPassword,
    component: Auth,
    props: {
      routerPath: "/auth/forgot-password",
    },
  },
  {
    path: config.routes.logout,
    component: Auth,
    props: {
      routerPath: "/auth/logout",
    },
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
