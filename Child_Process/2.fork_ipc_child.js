process.on("message", (msg) => {
  console.log("child process received message: " + msg.message);
});

process.send({message: "hello father"});
