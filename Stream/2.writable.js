/* Node.js 入门经典-20章 */
const fs = require("fs");
const readable = fs.ReadStream("names.txt");
const writable = fs.WriteStream("out.txt");
readable.setEncoding("utf-8");

// 边读边写
readable.on("data", function (chunk) {
  writable.write(chunk);
});

readable.on("close", () => {
  writable.end();
});
