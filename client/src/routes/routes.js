import config from "~/config";

import LoginForm from "~/components/AuthForm/LoginForm";
import RegisterForm from "~/components/AuthForm/RegisterForm";

const publicRoutes = [
  {
    path: config.routes.home,
    component: null,
  },
  {
    path: config.routes.login,
    component: LoginForm,
  },
  {
    path: config.routes.register,
    component: RegisterForm,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
