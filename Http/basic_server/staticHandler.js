const fs = require("fs");
const mime = require("mime");

exports.handle = function (req, res) {
  if (req.method !== "GET") {
     res.writeHead(404, {
       "content-type": "text/plain"
     });
     res.end("Invalid method:" + req.method);
  } else {
    let fname = req.basicServer.container.options.docroot + req.basicServer.urlParsed.pathname;
    // 路径以/结尾添加index.html
    if (fname.match(/\/$/)) fname += "index.html";
    fs.stat(fname, function(err, stats) {
      if (err) {
         res.writeHead(500, {
           "content-type": "text/plain"
         });
         res.end("not found1");
      } else {
        fs.readFile(fname, function(err, chunk) {

          if (err) {
            res.writeHead(500, {
              "content-type": "text/plain"
            });
            res.end("not found");
          } else {
            res.writeHead(200, {
              "content-type": mime.getType(fname),
              "content-length": chunk.length
            });
            res.end(chunk);
          }
        });
      }
    });
  }
}
