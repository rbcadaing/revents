import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

export default configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);
