import { combineReducers } from "redux";

import contactsReducer from "./contacts_reducer";

export default combineReducers({
  contacts: contactsReducer
});
