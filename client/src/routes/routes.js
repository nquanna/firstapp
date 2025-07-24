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
      routerPath: config.routes.login,
    },
  },
  {
    path: config.routes.register,
    component: AuthPage,
    props: {
      routerPath: config.routes.register,
    },
  },
  {
    path: config.routes.forgotPassword,
    component: AuthPage,
    props: {
      routerPath: config.routes.forgotPassword,
    },
  },
  {
    path: config.routes.logout,
    component: AuthPage,
    props: {
      routerPath: config.routes.logout,
    },
  },

  {
    path: config.routes.me,
    component: MePage,
    props: {
      routerPath: config.routes.me,
    },
  },
  {
    path: config.routes.account,
    component: MePage,
    props: {
      routerPath: config.routes.account,
    },
  },
  {
    path: config.routes.notification,
    component: MePage,
    props: {
      routerPath: config.routes.notification,
    },
  },
  {
    path: config.routes.purchaseOrder,
    component: MePage,
    props: {
      routerPath: config.routes.purchaseOrder,
    },
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
