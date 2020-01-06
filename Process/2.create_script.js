#! usr/bin/env node
/* shebang: 告诉OS从哪里找到二进制程序执行脚本 */

/* 
  Node.js精于网络编程，脚本涉及做网络编程的事情，node是个很好的选择。
  Node.js并不是作为通用的脚本语言来设立的，有些目标使用其他语言更合适。
  永远选择最合适的工具！！！
*/

// monit、upstart、forever模块帮助监视进程并在需要的时候重启
// 帮助编写脚本的模块：Commander、cli
console.log('first node script');

var http = require("http");

if (!process.argv[2]) {
  console.log(`A search key is required!`);
  process.exit(1);
}

var options = {
  host: "search.twitter.com",
  path: "/search.json?q=" + process.argv[2]
}

http.get(options, (res) => {
  let data = "", json = "";
  res.on("data", function(chunk){
    data += chunk;
  });

  res.on("end", function() {
    json = JSON.parse(data);
    for (let index = 0; index < json.result.length; index++) {
      console.log(json.result[i]);
    }
    process.exit(0);
  });
}).on("error", function(e) {
  console.log("error:" + e.message);
  process.exit(1);
});


