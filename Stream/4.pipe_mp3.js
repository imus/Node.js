const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  let mp3 = "Softcover.mp3";
  let stat = fs.statSync(mp3);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size
  });

  readableStream = fs.createReadStream(mp3);
  readableStream.pipe(res);
}).listen(3000);




