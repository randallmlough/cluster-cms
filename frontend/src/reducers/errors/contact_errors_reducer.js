import { actions } from "../../actions";

export default (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case actions.RECEIVE_CONTACTS:
      return {};
    case actions.RECEIVE_CONTACT:
      return {};
    case actions.RECEIVE_CONTACT_ERRORS:
      return action.errors
    default:
      return state;
  }
};
