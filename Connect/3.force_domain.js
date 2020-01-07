const http = require("http");
const app = require("connect")();

app.use(forceDomain("127.0.0.1:3000"))
   .use(userAgent)
   .use(hello);

function forceDomain(domain) {
  var domain = domain || false;
  return function (req, res, next) {
    if (domain && (req.headers.host != domain)) {
      res.writeHead(301, {"Location": "http://" + domain + req.url});
      res.end();
    } else {
      next();
    }
  }
}

function userAgent(req, res, next) {
  console.log(req.headers['user-agent']);
  next();
}

function hello(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("hello force domain");
  res.end();
}

http.Server(app).listen(3000);
