import { devToolsEnhancer } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default configureStore({ reducer: rootReducer }, devToolsEnhancer());
