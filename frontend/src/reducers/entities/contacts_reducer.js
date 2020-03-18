import { actions } from "../../actions";

export default (state=[], action) => {
  Object.freeze(state);
  let contacts = Object.assign([], state);
  let found;

  switch (action.type) {
    case actions.RECEIVE_CONTACTS:
      return action.contacts;
    case actions.RECEIVE_CONTACT:
      found = contacts.findIndex(el => el.id === action.contact.id);
      if (found === -1) {
        contacts.push(action.contact);
      } else {
        contacts[found] = action.contact;
      }
      return contacts;
    case actions.REMOVE_CONTACT:
      found = contacts.findIndex(el => el.id === action.contact.id);
      if (found === -1) {
        return state;
      } else {
        return contacts.splice(found, 1);
      }
    default:
      return state;
  }
};
