import { ActionTypes } from "../../../shared/types";
import { AnyAction } from "redux";

export function setConnected(isConnected: boolean): AnyAction {
  return {
    type: ActionTypes.ChangeConnected,
    payload: { isConnected }
  };
}
