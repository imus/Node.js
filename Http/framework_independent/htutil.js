const url = require("url");

//中间件

// 解析参数并保存，参数只有在提交的时候才会添加到url,所有要考虑参数存不存在。
exports.loadParams = function (req, res, next) {
  req.reqUrl = url.parse(req.url, true);
  req.a = (req.reqUrl.query.a && !isNaN(req.reqUrl.query.a))
          ? new Number(req.reqUrl.query.a) : NaN;
  req.b = (req.reqUrl.query.b && !isNaN(req.reqUrl.query.b))
          ? new Number(req.reqUrl.query.b) : NaN;

  if (next) {
    next();
  }
}

// 页面布局的集中处理, 减少重复代码
exports.navBar = function () {
  return [
   ' <div class="nav-bar">',
      '<p><a href="/">主页</a></p>',
      '<p><a href="/multi">两数相乘</a></p>',
      '<p><a href="/square">平方</a></p>',
      '<p><a href="/factorial">阶乘</a></p>',
      '<p><a href="/fibonacci">斐波那契数</a></p>',
    '</div>'
  ].join("\n");
}

exports.page = function (title, navbar, content) {
  return `<!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8"><title>{title}</title></head>
          <body>
            <h4>{title}</h4>
            <table>
              <tr>
                <td>{navbar}</td>
                <td>{content}</td>
              </tr>
            </table>
          </body>
          </html>`
          .replace(/\{title\}/g, title)
          .replace(/\{navbar\}/g, navbar)
          .replace(/\{content\}/g, content);
}

