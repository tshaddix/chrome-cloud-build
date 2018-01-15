import { ActionTypes } from "../../../shared/types";
import { configure, unconfigure } from "./configure";

export default {
  [ActionTypes.Configure]: action => configure(action.payload),

  [ActionTypes.UnConfigure]: action => unconfigure()
};
