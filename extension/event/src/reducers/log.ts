import { ILogState, ActionTypes, ILogEntry } from "../../../shared/types";
import { AnyAction } from "redux";

const MAX_LOG_LENGTH = 100;

const initialState: ILogState = {
  logs: []
};

export default (
  state: ILogState = initialState,
  action: AnyAction
): ILogState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.Log:
      const { time, content, type } = payload;

      const logs = state.logs.concat([{ time, content, type }]);

      if (logs.length > MAX_LOG_LENGTH) {
        logs.unshift();
      }

      return {
        logs
      };
    case ActionTypes.UnConfigureAlias:
      return {
        logs: []
      };
    default:
      return state;
  }
};
