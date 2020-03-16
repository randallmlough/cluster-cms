import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
export const StaticView = ({ component: Component, showNav, ...rest }) => {
  return (
    <>
      <Route {...rest} render={props => <Component {...props} />} />
    </>
  );
};

export const AppView = props => {
  return (
    <>
      <Navbar />
      <PrivateRoute {...props} />
    </>
  );
};

const PrivateRouteComp = props => {
  const { isAuthenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.session && state.session.isAuthenticated
});

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComp);
