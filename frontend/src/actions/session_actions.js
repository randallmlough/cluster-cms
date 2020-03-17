import { actions } from "./index";
import { registerUser, authenticateUser, formatError } from "../api";
import {
  saveSessionToken,
  decodeJWT,
  deleteSessionToken
} from "../utils/session";

const receiveUserSession = user => ({
  type: actions.RECEIVE_USER_SESSION,
  user
});

const removeUserSession = () => ({
  type: actions.REMOVE_USER_SESSION
});

export const registerUserAction = user => async dispatch => {
  return await registerUser(user)
    .then(resp => {
      const session = decodeJWT(resp.data.token);
      dispatch(receiveUserSession(session));
      saveSessionToken(resp.data.token);
    })
    .catch(error => Promise.reject(formatError(error)));
};

export const authenticateUserAction = ({
  email,
  password
}) => async dispatch => {
  return await authenticateUser({ email, password })
    .then(resp => {
      const session = decodeJWT(resp.data.token);
      dispatch(receiveUserSession(session));
      saveSessionToken(resp.data.token);
    })
    .catch(error => Promise.reject(formatError(error)));
};

export const removeUserSessionAction = () => dispatch => {
  dispatch(removeUserSession());
  deleteSessionToken();
};
