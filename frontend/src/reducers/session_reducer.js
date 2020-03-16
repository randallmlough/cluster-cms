import { actions } from "../actions";

const _nullState = {
  isAuthenticated: false,
  user: null
};

export default (state = _nullState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case actions.RECEIVE_USER_SESSION:
      return Object.assign({}, { isAuthenticated: true, user: action.user });
    case actions.REMOVE_USER_SESSION:
      return _nullState;
    default:
      return state;
  }
};
