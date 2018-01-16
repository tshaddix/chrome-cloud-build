import * as yargs from "yargs";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as SocketIO from "socket.io";
import {Server} from "http";
import * as fs from "fs";
import * as chokidar from "chokidar";
import { keys } from "lodash";

enum MsgType {
  ListFiles = "ListFiles",
  FileUpdated = "FileUpdated"
}

const argv = yargs
  .usage("Usage: $0 -p [num] -d [string] -h [string]")
  .demandOption(["p", "d"]).argv;

const port: number = argv.p;
const srcDir: string = argv.d;
const hostname: string = argv.h || "localhost";

const app = express();

const typeSafeServer = Server as any;
const server = typeSafeServer(app);

app.use(cors());

// Tie static route over src folder
app.use("/src", express.static(srcDir));

const io = SocketIO(server);

io.on("connection", function(socket) {
  const paths = watcher.getWatched();

  const fullPaths = [];

  keys(paths).forEach((key: string) => {
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
  console.log("File updated - sending update to all clients...");

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
} catch (err) {
  console.log(`Error reading src directory: ${err}`);
  process.exit(1);
}

server.listen(port, hostname, () => {
  console.log(`Chrome Cloud Build Server started on port ${port}.`);
  console.log(`Watching src from ${srcDir}...`);
});
