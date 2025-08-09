import config from "~/config";

import { SidebarLayout } from "~/layouts";

import HomePage from "~/pages/HomePage";
import AuthPage from "~/pages/AuthPage";
import MePage from "~/pages/MePage";
import AIPage from "~/pages/AIPage";
import LearnPage from "~/pages/LearnPage";

const routes = [
  /* PUBLIC ROUTES */
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

  /* PRIVATE ROUTES */
  {
    path: config.routes.account,
    private: true,
    layout: SidebarLayout,
    component: MePage,
    props: {
      routerPath: config.routes.account,
    },
  },
  {
    path: config.routes.notification,
    private: true,
    layout: SidebarLayout,
    component: MePage,
    props: {
      routerPath: config.routes.notification,
    },
  },
  {
    path: config.routes.purchaseOrder,
    private: true,
    layout: SidebarLayout,
    component: MePage,
    props: {
      routerPath: config.routes.purchaseOrder,
    },
  },

  {
    path: config.routes.ai,
    private: true,
    component: AIPage,
    props: {
      routerPath: config.routes.ai,
    },
  },

  {
    path: config.routes.learn,
    private: true,
    layout: SidebarLayout,
    component: LearnPage,
    props: {
      routerPath: config.routes.learn,
    },
    layoutProps: {
      routerPath: config.routes.learn,
    },
  },
  {
    path: config.routes.todayVocabularies,
    private: true,
    layout: SidebarLayout,
    component: LearnPage,
    props: {
      routerPath: config.routes.todayVocabularies,
    },
    layoutProps: {
      routerPath: config.routes.learn,
    },
  },
  {
    path: config.routes.addVocabulary,
    private: true,
    layout: SidebarLayout,
    component: LearnPage,
    props: {
      routerPath: config.routes.addVocabulary,
    },
    layoutProps: {
      routerPath: config.routes.learn,
    },
  },
  {
    path: config.routes.allVocabularies,
    private: true,
    layout: SidebarLayout,
    component: LearnPage,
    props: {
      routerPath: config.routes.allVocabularies,
    },
    layoutProps: {
      routerPath: config.routes.learn,
    },
  },
];

export default routes;
