import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { receiveUserSession } from "../../actions";
import { decodeJWT, saveSessionToken } from '../../utils/session'
import { fetchOAuthToken } from '../../utils/oauth'


class OAuthCallback extends React.Component {
  componentDidMount() {
    const { location, dispatch } = this.props;

    fetchOAuthToken(location.search)
      .then(res => {
        const token = res.data.token,
          session = decodeJWT(token);
        saveSessionToken(token);
        dispatch(receiveUserSession(session));
      });
  }

  render() {
    const { isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return <></>;
    }
  }
};

export default OAuthCallback;

const mapStateToProps = state => ({
  isAuthenticated: state.session && state.session.isAuthenticated
});

export const OAuthCallbackContainer = connect(
  mapStateToProps, null
)(OAuthCallback);
