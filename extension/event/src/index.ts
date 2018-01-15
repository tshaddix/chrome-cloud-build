import * as SocketIOClient from "socket.io-client";

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

interface IAppState {
  // the root server url
  serverRoot?: string;
  // the name of the directory to create
  // and update in downloads
  dirName?: string;
  // specifies whether the socket is currently connected
  isConnected: boolean;
  // specifies whether the app has been configured
  isSetup: boolean;
  // contains last error encountered
  error?: Error;
}

const SERVER_ROOT = "http://34.212.184.97:8081";
const DIR_NAME = "chrome-cloud-build";

const socket = SocketIOClient(SERVER_ROOT);

function downloadFile(path: string): void {
  chrome.downloads.download({
    filename: `${DIR_NAME}/${path}`,
    url: `${SERVER_ROOT}/src/${path}`,
    conflictAction: "overwrite"
  });
}

socket.on("connect", function() {
  console.log("Connected to build server.");
});

socket.on("disconnect", function() {});

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
