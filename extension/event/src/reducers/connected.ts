import { IConnectedState, ActionTypes } from "../../../shared/types";
import { AnyAction } from "redux";

const initialState: IConnectedState = {
  isConnected: false
};

export default (
  state: IConnectedState = initialState,
  action: AnyAction
): IConnectedState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ChangeConnected:
      const { isConnected } = payload;

      return {
        isConnected
      };
    default:
      return state;
  }
};
