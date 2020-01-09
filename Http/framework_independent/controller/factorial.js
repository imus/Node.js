const {
  navBar,
  page
} = require("../htutil");
const { factorial } = require("../math");

exports.get = function (req, res) {
  res.writeHead(200, {
    "content-type": "text/html"
  });
  res.end(
    page("阶乘", navBar(), [
      ((!isNaN(req.a)) ?
        `<p class="result">{a}! = {result}</p>`
        .replace(/\{a\}/g, req.a)
        .replace(/\{result\}/g, factorial(Math.floor(req.a), 1)):
        ''),
      `<p>请输入求阶乘的数</p>
        <form action="/factorial" method="GET" encrypt="application/x-www-form-urlencoded name="factorial">
          a: <input type="text" name="a" /><br />
          <input type="submit" value="提交" />
        </form>`
    ].join('\n'))
  );
}