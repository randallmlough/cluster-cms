import React from "react";
import { Switch } from "react-router-dom";
import { StaticView, AppView } from "./views";
import { RegisterUserView, AuthenticateUserView, OAuthCallback } from "./views/session";
import Dashboard from "./views/dashboard";
import NotFound from "./views/404";

export default () => {
  return (
    <Switch>
      <StaticView exact path={routes.REGISTER} component={RegisterUserView} />
      <StaticView exact path={routes.LOGIN} component={AuthenticateUserView} />
      <StaticView exact path={routes.OAUTH} component={OAuthCallback} />
      <AppView exact path={routes.DASHBOARD} component={Dashboard} />
      <StaticView path="*" component={NotFound} />
    </Switch>
  );
};

export const routes = {
  // static routes
  REGISTER: "/register",
  LOGIN: "/login",
  OAUTH: "/oauth",

  // app routes
  DASHBOARD: "/"
};
