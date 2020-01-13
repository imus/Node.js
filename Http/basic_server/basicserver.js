const http = require("http");
const url = require("url");

function lookupContainer(htserver, host, path) {
  for (let index = 0; index < htserver.basicServer.containers.length; index++) {
    const container = htserver.basicServer.containers[index];
    const hostmatched = host.toLowerCase().match(container.host);
    const pathmatched = path.match(container.path);
    if (hostmatched !== null && pathmatched !== null) {
      return {
        container,
        host,
        path
      }
    }
  }
  return undefined;
}

function processHeaders(req, res) {
  req.basicServer.cookies = [];
  const headers = Object.keys(req.headers);
  for (let index = 0; index < headers.length; index++) {
    if (headers[index].toLowerCase() === "cookie") {
      req.basicServer.cookies.push(req.headers[headers[index]]);
    }
    if (headers[index].toLowerCase() === "host") {
      req.basicServer.host = req.headers[headers[index]];
    }
  }
}

function dispatchToContainers(htserver, req, res) {
  let container = lookupContainer(htserver, req.basicServer.host, req.basicServer.urlParsed.pathname);

  if (container !== undefined) {
    req.basicServer.hostMathes = container.host;
    req.basicServer.pathMathes = container.path;
    req.basicServer.container = container.container;
    
    container.container.module.handle(req, res);
  } else {
    res.writeHead(404, {"content-type": "text/plain"});
    res.end(`no handler found for ${req.host}/${req.basicServer.urlParsed.pathname}`);
  }

}

exports.createServer = function () {
  const htserver = http.createServer((req, res) => {
    // 处理请求
    req.basicServer = {
      urlParsed: url.parse(req.url, true)
    }
    processHeaders(req, res);
    // 查找匹配容器，分派请求到对应的容器中
    dispatchToContainers(htserver, req, res);
  });

  htserver.basicServer = { containers: [] /* 相当于express路由器中间件 */ };
  htserver.addContainer = function (host, path, module, options) {
    if (lookupContainer(htserver, host, path) !== undefined) {
      throw new Error("Already mapped" + host +"/"+ path);
    }

    htserver.basicServer.containers.push({
      host,
      path,
      module,
      options
    });

    return this;
  }

  htserver.useFavicon = function (host, path) {
    return this.addContainer(host, "/favicon", require("./faviconHandler"), {iconPath: path});
  }

  // 处理静态文件
  htserver.docroot = function (host, path, rootPath) {
    return this.addContainer(host, path, require("./staticHandler"), {
      docroot: rootPath
    });
  }

  return htserver;
}