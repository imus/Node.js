const code2url = {
  "ex1": "http://example1.com",
  "ex2": "http://example2.com"
}

function notFound(req, res) {
  res.writeHead(404, {"content-type": "text/plain"});
  res.end(`no matching redirect code found for ${req.basicServer.host}/${req.basicServer.urlParsed.pathname}`);
}

exports.handle = function (req, res) {
  let code = req.basicServer.pathMatches[1];
  if (code && code2url[code]) {
    res.writeHead(302, {"Location": code2url[code]});
    res.end();
  } else {
    notFound(req, res);
  }
}