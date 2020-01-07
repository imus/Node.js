const http = require("http");
const app = require("connect")();

function filterByIp(ips) {
  var ips = ips || [];
  return function (req, res, next) {
    let ip = req.connection.remoteAddress;
    if (ip.indexOf("::ffff:") !== -1) {
      ip = ip.substring(7);
    }
    
    if (ips.indexOf(ip) === -1) {
      res.writeHead(401, {"Content-Type": "text/plain"});
      res.end("Sorry, you are not allowed to access this server!");
    } else {
      next();
    }
  }
}

function hello(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello middleware!");
}

app.use(filterByIp(["127.0.0.1"]))
    .use(hello);

http.Server(app).listen(3000);

