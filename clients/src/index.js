import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";  // Keep track of store ,access it anywhere from the app
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
// ApplyMiddleWare 
// store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//provider is a component that allows us to access the store from all the components
//it keeps track of store which is global state and access from anywhere
