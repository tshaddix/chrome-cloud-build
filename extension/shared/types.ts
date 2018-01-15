import { AnyAction } from "redux";

export interface IState {
  log: ILogState;
  connected: IConnectedState;
  configured: IConfiguredState;
}
export interface IConfiguredState {
  isConfigured: boolean;
  serverRoot?: string;
  dirName?: string;
}

export interface IConnectedState {
  isConnected: boolean;
}

export enum ActionTypes {
  Configure = "CONFIGURE",
  ConfigureAlias = "CONFIGURE_ALIAS",
  UnConfigure = "UNCONFIGURE",
  UnConfigureAlias = "UNCONFIGURE_ALIAS",
  Log = "LOG",
  ChangeConnected = "CHANGE_CONNECTED"
}

export interface IDispatch {
  (action: AnyAction): void;
}

export interface IThunk {
  (dispatch: IDispatch): void;
}

export enum LogTypes {
  Log = 0,
  Error,
  Warning
}

export interface ILogEntry {
  time: number;
  content: string;
  type: LogTypes;
}

export interface ILogState {
  logs: ILogEntry[];
}
