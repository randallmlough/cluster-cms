import { actions } from "../../actions";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actions.RECEIVE_CONTACTS:
      const newContacts = {};
      action.contacts.forEach(contact => (newContacts[contact.id] = contact));
      return Object.assign({}, state, newContacts);
    case actions.RECEIVE_CONTACT:
      return Object.assign({}, state, { [action.contact.id]: action.contact });
    case actions.REMOVE_CONTACT:
      const newState = state;
      delete newState[action.contact.id];
      return newState;
    default:
      return state;
  }
};
