process.stdin.resume(); // 防止脚本在初始化从stdin读取时退出

/* 
  为什么要给脚本发送信号？
  信号在UNIX类型系统中用于进程间通信提供一种方法，可以让进程终止、挂起和重启。
  信号是POSIX系统的一个标准，意味着许多程序使用它。在Node.js中使用信号让我们可以在
  需要的时候与UNIX工具集成。
*/
process.on("SIGINT", (signal) => {
  console.log(`接收到${signal}`);
  process.exit(0); // 退出时给出一个正确的状态码是必要的， 因为其他脚本可能与之交互
});

// 用处：脚本退出时执行一些清理操作：关闭连接、记录信息
process.on("exit", (code) => {
  // do something
  console.log(`process exit! exit code: ${code}`);
});

//用处： 捕获未捕获的异常，并将它们发送到电子邮件地址
// 该事件中代码的执行情况是完全不能被信赖的

// node-exception-notifier
process.on("uncaughtException", (err) => {
  console.error(err.stack);
});

