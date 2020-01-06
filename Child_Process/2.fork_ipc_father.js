/* 
  fork是spawn的一个特例，衍生新的Node.js子进程，并提供让父子进程具备通信通道的能力。
  如果与系统命令交互，就使用spawn。
*/
const { fork } = require("child_process");
const child = fork('./2.fork_ipc_child.js');

child.on("message", (msg) => {
  console.log(`parent process received message: ${msg.message}`);
});

child.send({message: "hello child"});
