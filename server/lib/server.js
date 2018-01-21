#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const express = require("express");
const cors = require("cors");
const SocketIO = require("socket.io");
const http_1 = require("http");
const fs = require("fs");
const chokidar = require("chokidar");
const lodash_1 = require("lodash");
var MsgType;
(function (MsgType) {
    MsgType["ListFiles"] = "ListFiles";
    MsgType["FileUpdated"] = "FileUpdated";
})(MsgType || (MsgType = {}));
const argv = yargs
    .usage("Usage: $0 -p [num] -d [string] -h [string]")
    .demandOption(["p", "d"]).argv;
const port = argv.p;
const srcDir = argv.d;
const hostname = argv.h || "localhost";
const app = express();
const typeSafeServer = http_1.Server;
const server = typeSafeServer(app);
app.use(cors());
// Tie static route over src folder
app.use("/src", express.static(srcDir));
const io = SocketIO(server);
io.on("connection", function (socket) {
    const paths = watcher.getWatched();
    const fullPaths = [];
    // remove directories from
    // file paths array
    lodash_1.keys(paths)
        .filter(key => key !== "..")
        .forEach((key) => {
        const dirs = key.split("/");
        let parentDir = "";
        if (dirs.length === 1) {
            parentDir = ".";
        }
        else {
            parentDir = dirs.slice(0, -1).join("/");
        }
        paths[parentDir] = paths[parentDir].filter(filename => filename !== dirs[dirs.length - 1]);
    });
    // flatten all file paths
    lodash_1.keys(paths).forEach((key) => {
        if (key === "..") {
            return;
        }
        if (key === ".") {
            fullPaths.push.apply(fullPaths, paths[key]);
            return;
        }
        paths[key]
            .map(filename => {
            return `${key}/${filename}`;
        })
            .forEach(fullPath => {
            fullPaths.push(fullPath);
        });
    });
    console.log("Client connected...");
    socket.emit(MsgType.ListFiles, { paths: fullPaths });
});
function onFileUpdated(path) {
    console.log(`File updated: ${path}`);
    io.emit(MsgType.FileUpdated, { path });
}
const watcher = chokidar.watch(".", {
    persistent: true,
    ignoreInitial: true,
    cwd: srcDir,
    // we use polling because it is common to wipe the build directory
    // when rebuilding via script
    usePolling: true,
    atomic: true
});
watcher.on("add", onFileUpdated).on("change", onFileUpdated);
console.log(`Confirming access to src directory: ${srcDir}...`);
try {
    fs.readdirSync(srcDir);
}
catch (err) {
    console.log(`Error reading src directory: ${err}`);
    process.exit(1);
}
server.listen(port, hostname, () => {
    console.log(`Chrome Cloud Build Server started on port ${port}.`);
    console.log(`Watching src from ${srcDir}...`);
});
//# sourceMappingURL=server.js.map
