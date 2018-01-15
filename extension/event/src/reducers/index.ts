import { combineReducers, Reducer } from "redux";

import { IState } from "../../../shared/types";
import configured from "./configured";
import log from "./log";
import connected from "./connected";

// note: this typecheck is broken in redux 3.7.2
export default combineReducers({
  configured,
  log,
  connected
} as any) as Reducer<IState>;
