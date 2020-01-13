const server = require("./basicserver").createServer();
server.useFavicon("localhsot", "./docroot/favicon.ico");
server.docroot("localhost", "/", "./docroot");

server.listen(4000);