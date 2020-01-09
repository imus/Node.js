const {
  navBar,
  page
} = require("../htutil");

exports.get = function (req, res) {
  res.writeHead(200, {
    "content-type": "text/html"
  });
  res.end(
    page("square", navBar(), [
      ((!isNaN(req.a)) ?
        `<p class="result">{a}<sup>^2</sup> = {result}</p>`
        .replace(/\{a\}/g, req.a)
        .replace(/\{result\}/g, Math.pow(req.a, 2))
        : ''),
      `<p>请输入要求平方的数</p>
        <form action="/square" method="GET" encrypt="application/x-www-form-urlencoded name="square">
          a: <input type="text" name="a" /><br />
          <input type="submit" value="提交" />
        </form>`
    ].join('\n'))
  );
}