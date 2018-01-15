import { createStore, applyMiddleware } from "redux";
import { alias } from "react-chrome-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { IState } from "../../shared/types";
import rootReducer from "./reducers";
import aliases from "./actions/aliases";

const logger = createLogger();
const middleware = [alias(aliases), thunk, logger];

export default () => {
  return createStore<IState>(rootReducer, applyMiddleware(...middleware));
};
