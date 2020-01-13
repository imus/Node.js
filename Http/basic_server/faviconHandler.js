const fs = require("fs");
const mime = require("mime");

exports.handle = function (req, res) {
  if (req.method !== "GET") {
    res.writeHead(404, {
      "content-type": "text/plain"
    });
    res.end("Invalid method:" + req.method);
  } else if (req.basicServer.container.options.iconPath !== undefined) {
    fs.readFile(req.basicServer.container.options.iconPath, function(err, chunk) {
      if (err) {
        res.writeHead(500, {
          "content-type": "text/plain"
        });
        res.end("not found");
      } else {
        res.writeHead(200, {
          "content-type": mime.getType(req.basicServer.container.options.iconPath),
          "content-length": chunk.length
        });
        res.end(chunk);
      }
    });
  } else {
    res.writeHead(404, {"content-type": "text/plain"});
    res.end("no favicon!");
  }
}
