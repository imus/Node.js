const cluster = require("cluster");
const os = require("os");
const http = require("http");

if (cluster.isMaster) {
  console.log(`主进程${process.pid}正在运行...`);
  for (let index = 0; index < os.cpus().length; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log("工作进程 %d 已关闭%s。重启中···", worker.process.pid, code || signal);
    cluster.fork();
  });
} else {
  console.log("worker process started with PID:" + process.pid);
  http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "text/plain"});
    res.end("hello cluster" + os.EOL);
  }).listen(3000);
}

