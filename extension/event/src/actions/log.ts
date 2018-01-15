import { ActionTypes, LogTypes } from "../../../shared/types";
import { AnyAction } from "redux";

export function makeLogAction(type: LogTypes, content: string): AnyAction {
  return {
    type: ActionTypes.Log,
    payload: {
      type,
      content,
      time: Date.now()
    }
  };
}

export function log(content: string): AnyAction {
  return makeLogAction(LogTypes.Log, content);
}

export function warning(content: string): AnyAction {
  return makeLogAction(LogTypes.Warning, content);
}

export function error(content: string): AnyAction {
  return makeLogAction(LogTypes.Error, content);
}
