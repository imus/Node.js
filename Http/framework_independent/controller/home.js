const { navBar, page } = require("../htutil");

exports.get = function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(page("数学向导", navBar(), "<p>Math Wizard</p>"));
}