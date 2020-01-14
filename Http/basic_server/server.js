const server = require("./basicserver").createServer();
server.useFavicon("localhsot", "./docroot/favicon.ico");
// 访问http://localhost:4000/1/ex1, http://localhost:4000/1/ex2,
server.addContainer(".*", "/1/(.*)$", require("./redirect.js"), {});
server.docroot("localhost", "/", "./docroot");

server.listen(4000);