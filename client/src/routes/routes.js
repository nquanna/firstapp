import config from "~/config";

import HomePage from "~/pages/HomePage";
import AuthPage from "~/pages/AuthPage";
import MePage from "~/pages/MePage";

const publicRoutes = [
  {
    path: config.routes.home,
    component: HomePage,
    props: {},
  },
  {
    path: config.routes.login,
    component: AuthPage,
    props: {
      routerPath: "/auth/login",
    },
  },
  {
    path: config.routes.register,
    component: AuthPage,
    props: {
      routerPath: "/auth/register",
    },
  },
  {
    path: config.routes.forgotPassword,
    component: AuthPage,
    props: {
      routerPath: "/auth/forgot-password",
    },
  },
  {
    path: config.routes.logout,
    component: AuthPage,
    props: {
      routerPath: "/auth/logout",
    },
  },
  {
    path: config.routes.me,
    component: MePage,
    props: {},
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
