import { combineReducers } from "redux";

import sessionReducer from "./session_reducer";
import entitiesReducer from './entities';
import errorsReducer from "./errors";

export default combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  errors: errorsReducer
});
