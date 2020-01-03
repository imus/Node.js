/* Node.js 入门经典-20章 */

// Node.js中的流是可读的、可写的，与标准输入(stdin)和标准输出(stdout)松散关联：
// 标准输入是可读的、标准输出是可写的。

// 缓冲区是Node.js中处理原始数据的方式，流是Node.js中移动数据的方式。
// 缓冲区被用于与流一起读写数据。
const fs = require("fs");
const readable = fs.ReadStream("names.txt");
readable.setEncoding("utf-8");

let data = "";

// 读入所有数据然后处理
readable.on("data", function(chunk) { // 大文件可能多次触发data事件
  data += chunk;
  console.log("start");
});

readable.on("close", () => {
  console.log("read close");
  console.log(data);
});
