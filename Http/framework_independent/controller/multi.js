const { navBar, page } = require("../htutil");

exports.get = function (req, res) {
  res.writeHead(200, {
    "content-type": "text/html"
  });
  res.end(
    page("Multiplication", navBar(), [
      ((!isNaN(req.a) && !isNaN(req.b)) ? 
      `<p class="result">{a} * {b} = {result}</p>`
        .replace(/\{a\}/g, req.a)
        .replace(/\{b\}/g, req.b)
        .replace(/\{result\}/g, req.a * req.b)
      : ''),
      `<p>请输入相乘的两个数</p>
        <form action="/multi" method="GET" encrypt="application/x-www-form-urlencoded name="multi">
          a: <input type="text" name="a" /><br />
          b: <input type="text" name="b" />
          <input type="submit" value="提交" />
        </form>`
    ].join('\n'))
  );
}