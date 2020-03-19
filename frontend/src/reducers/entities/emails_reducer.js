import { actions } from "../../actions";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actions.RECEIVE_EMAILS:
      const newEmails = {};
      action.emails.forEach(email => (newEmails[email.id] = email));
      return Object.assign({}, state, newEmails);
    case actions.RECEIVE_EMAIL:
      return Object.assign({}, state, { [action.email.id]: action.email });
    default:
      return state;
  }
};
