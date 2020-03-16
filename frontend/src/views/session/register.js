import React from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUserAction, authenticateUserAction } from "../../actions";
import { ReactComponent as Logo } from "./logo.svg";
import googleLogo from "./google-logo.webp";
import SessionForm from "./Form";

export default function RegisterView(props) {
  const { isAuthenticated, submit } = props;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center">
        <div className="w-4/12">
          <div className="text-center mb-5">
            <Logo className="mx-auto mb-4" />
            <span className="text-sm mr-1">Have an account?</span>
            <Link to="/login" className="text-secondary-500 text-sm ">
              Log in
            </Link>
          </div>
          <SessionForm submit={submit} register />
          <hr className="bg-gray-100 my-5 h-px" />
          <button
            className="block w-full border flex rounded-sm text-white"
            style={{ backgroundColor: "#5886d4", borderColor: "#5886d4" }}
          >
            <div className="bg-white flex font-black items-center px-2 self-stretch text-2xl text-gray-800">
              <img src={googleLogo} alt="Google's logo" className="h-6" />
            </div>
            <div className="flex-1 py-2 text-sm">Sign up with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
}

RegisterView.propTypes = {
  submit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.session && state.session.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  demo: async user => await dispatch(authenticateUserAction(user)),
  submit: async user => await dispatch(registerUserAction(user))
});

export const RegisterUserViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView);
