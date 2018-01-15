import { IConfiguredState, ActionTypes } from "../../../shared/types";
import { AnyAction } from "redux";

const initialState: IConfiguredState = {
  isConfigured: false,
  serverRoot: null,
  dirName: null
};

export default (
  state: IConfiguredState = initialState,
  action: AnyAction
): IConfiguredState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ConfigureAlias:
      const { serverRoot, dirName } = payload;

      return {
        isConfigured: true,
        serverRoot,
        dirName
      };
    case ActionTypes.UnConfigureAlias:
      return {
        isConfigured: false,
        serverRoot: null,
        dirName: null
      };
    default:
      return state;
  }
};
