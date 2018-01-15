import { AnyAction } from "redux";
import * as SocketIOClient from "socket.io-client";

import { ActionTypes, IThunk } from "../../../shared/types";
import { log, warning, error } from "./log";
import { setConnected } from "./connect";

enum MsgType {
  ListFiles = "ListFiles",
  FileUpdated = "FileUpdated"
}

interface IListFilesEvent {
  paths: string[];
}

interface IFileUpdated {
  path: string;
}

let socket = null;

export function configure(opts: {
  serverRoot: string;
  dirName: string;
}): IThunk {
  return dispatch => {
    const { serverRoot, dirName } = opts;

    socket = SocketIOClient(serverRoot);

    dispatch(log(`Creating connection to ${serverRoot}`));

    chrome.browserAction.setBadgeText({ text: "*" });

    function downloadFile(path: string): void {
      const url = `${serverRoot}/src/${path}`;
      const filename = `${dirName}/${path}`;

      dispatch(log(`Beginning download for ${url}. Saving @ ${filename}`));

      chrome.downloads.download({
        filename,
        url,
        conflictAction: "overwrite"
      });
    }

    socket.on("connect", function() {
      dispatch(log("Successfully connected to build server."));

      dispatch(setConnected(true));

      chrome.browserAction.setBadgeBackgroundColor({ color: "#43a047" });
    });

    socket.on("disconnect", function() {
      dispatch(warning("Connection to build server disconnected."));

      dispatch(setConnected(false));

      chrome.browserAction.setBadgeBackgroundColor({ color: "#e53935" });
    });

    socket.on("reconnect_error", function(err: any) {
      dispatch(error(`Reconnect attempt failed: ${err}`));
    });

    socket.on("reconnect_attempt", function(attempt: number) {
      dispatch(log(`Attempting to reconnect... attempt ${attempt}`));
    });

    socket.on("reconnect_failed", function() {
      dispatch(error("Maximum number of reconnect attempts reached."));
    });

    socket.on(MsgType.ListFiles, (data: IListFilesEvent) => {
      const { paths } = data;

      paths.forEach(path => {
        downloadFile(path);
      });
    });

    socket.on(MsgType.FileUpdated, (data: IFileUpdated) => {
      const { path } = data;

      downloadFile(path);
    });

    dispatch({
      type: ActionTypes.ConfigureAlias,
      payload: {
        serverRoot,
        dirName
      }
    });
  };
}

export function unconfigure(): IThunk {
  return dispatch => {
    if (socket) {
      socket.close();
      socket = null;
    }

    chrome.browserAction.setBadgeText({ text: "" });

    dispatch({
      type: ActionTypes.UnConfigureAlias,
      payload: {}
    });
  };
}
