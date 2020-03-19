import { combineReducers } from "redux";

import contactsReducer from "./contacts_reducer";
import emailsReducer from "./emails_reducer";

export default combineReducers({
  contacts: contactsReducer,
  emails: emailsReducer
});
