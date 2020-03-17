import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { authenticateUserAction } from "../../actions";
import { ReactComponent as Logo } from "./logo.svg";
import googleLogo from "./google-logo.webp";
import SessionForm from "./Form";
import { fetchOAuthUrl, redirectToGoogle } from '../../utils/oauth';

export default function AuthenticateView(props) {
  const { isAuthenticated, submit } = props;
  let url = undefined;

  fetchOAuthUrl()
    .then((res) => url = res.data.url);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center">
        <div className="w-4/12">
          <div className="text-center mb-5">
            <Logo className="mx-auto mb-4" />
            <span className="text-sm mr-1">Don't have an account?</span>
            <Link to="/register" className="text-secondary-500 text-sm ">
              Sign up
            </Link>
          </div>
          <SessionForm submit={submit} />
          <hr className="bg-gray-100 my-5 h-px" />
          <a
            className="block w-full border flex rounded-sm text-white"
            style={{ backgroundColor: "#5886d4", borderColor: "#5886d4" }}
            onClick={e => redirectToGoogle(e, url)}
            href=""
          >
            <div className="bg-white flex font-black items-center px-2 self-stretch text-2xl text-gray-800">
              <img src={googleLogo} alt="Google's logo" className="h-6" />
            </div>
            <div className="flex-1 py-2 text-sm text-center">Sign in with Google</div>
          </a>
        </div>
      </div>
    </div>
  );
}

AuthenticateView.propTypes = {
  submit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.session && state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  submit: async user => await dispatch(authenticateUserAction(user))
});

export const AuthenticateUserViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateView);
