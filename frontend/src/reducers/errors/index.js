import { combineReducers } from "redux";

import contactErrorsReducer from "./contact_errors_reducer";

export default combineReducers({
  contacts: contactErrorsReducer
});
