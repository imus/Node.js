/** 
 * Node Web开发_2012.4, 第四章(请看原书))
 */

// 与其在一个庞大的回调中实现每一个细节，不如使用模块化的方式处理。
// 请求的路由选择，需要对http请求检查，然后调用对应的模块。
const http = require("http");
const { loadParams } = require("./htutil.js");

http.createServer((req, res) => {
  loadParams(req, res, undefined);

  switch (req.reqUrl.pathname) {
    case '/':
      require("./controller/home").get(req, res); // 处理器函数
      break;
    case '/multi': //相乘
      require("./controller/multi").get(req, res);
      
      break;
    case '/square':
      require("./controller/square").get(req, res);
      
      break;
    case '/factorial': //阶乘
      require("./controller/factorial").get(req, res);
      
      break;
    case '/fibonacci':
      require("./controller/fibonacci").get(req, res);
      
      break;
  
    default:
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("bad url" + req.url);
      break;
  }
}).listen(3000);


