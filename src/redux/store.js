import { createStore } from "redux";
import { rootReducer } from "./reducer/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducer, composeWithDevTools())