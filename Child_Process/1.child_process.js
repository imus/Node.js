/* 使用子进程的场景：
  需要计算一个复杂的等式
  需要使用Node.js外部的基于系统的工具操作一些数据
  正在执行任何资源密集型或者需要花费大量时间完成的操作
  想执行一些清理操作
*/
const { spawn } = require("child_process");
const ping = spawn("ping", ["www.baidu.com"]);

ping.stdout.setEncoding("UTF-8");
ping.stdout.on("data", (data) => {
  console.log(data);
});

ping.on("exit", function(code) {
  console.log("child process was killed, exit code:" + code);
});

// 父进程对子进程发送kill信号
// ping.kill("SIGINT");