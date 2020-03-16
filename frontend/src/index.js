import React from "react";
import ReactDOM from "react-dom";
import { getAndDecodeSession } from "./utils/session";
import configureStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const initialState = {
  session: { isAuthenticated: false, user: null }
};

const session = getAndDecodeSession();
if (session) {
  initialState.session = { isAuthenticated: true, user: session };
}
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
