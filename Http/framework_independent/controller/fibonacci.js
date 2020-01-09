const {
  navBar,
  page
} = require("../htutil");
const {
  fibonacci
} = require("../math");

exports.get = function (req, res) {
  res.writeHead(200, {
    "content-type": "text/html"
  });
  res.end(
    page("斐波那契", navBar(), [
      ((!isNaN(req.a)) ?
        `<p class="result">{a}的斐波那契值 = {result}</p>`
        .replace(/\{a\}/g, req.a)
        .replace(/\{result\}/g, fibonacci(Math.floor(req.a))):
        ''),
      `<p>查看某个数的斐波那契值</p>
        <form action="/fibonacci" method="GET" encrypt="application/x-www-form-urlencoded name="fibonacci">
          a: <input type="text" name="a" /><br />
          <input type="submit" value="提交" />
        </form>`
    ].join('\n'))
  );
}