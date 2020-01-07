/**
 * 中间件是通过在客户和应用程序逻辑之间添加一个瘦层来过滤应用程序中请求和响应的一种方法。
 * Connect中间件只是一个以请求、响应对象和next回调作为参数的函数, 对http模块的包装。
 * 中间件极适合操纵请求和响应。应该把它和应用程序分开来考虑，于是，处理数据和查询数据库的操作
 * 不应该放在中间件中。
 * 
 * jsgi(js gateway interface,参考CGI)  https://github.com/persvr/jsgi-node，是另外一种
 * 在Node.js中使用中间件的方法。
 *  */
const app = require("connect")();
const http = require("http");
app.use(hello);

function hello(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello connect!");
}

http.Server(app).listen(3000);


