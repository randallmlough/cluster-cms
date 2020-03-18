import React from "react";
import { Switch } from "react-router-dom";
import { StaticView, AppView } from "./views";
import {
  RegisterUserView,
  AuthenticateUserView,
  OAuthCallback
} from "./views/session";
import { ContactsListView, ContactShowView } from "./views/contacts";
import Dashboard from "./views/dashboard";
import NotFound from "./views/404";

export default () => {
  return (
    <Switch>
      {/* static routes */}
      <StaticView exact path={routes.REGISTER} component={RegisterUserView} />
      <StaticView exact path={routes.LOGIN} component={AuthenticateUserView} />
      <StaticView exact path={routes.OAUTH} component={OAuthCallback} />

      {/* application routes */}
      <AppView exact path={routes.CONTACTS_LIST} component={ContactsListView} />
      <AppView exact path={routes.CONTACT_SHOW} component={ContactShowView} />
      <AppView exact path={routes.DASHBOARD} component={Dashboard} />

      {/* 404 catch all */}
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
  DASHBOARD: "/",
  CONTACTS_LIST: "/contacts",
  CONTACT_SHOW: "/contacts/:id"
};
