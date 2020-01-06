// events源码:
// https: //github.com/nodejs/node/blob/714eb919cc497307b57e176547ba83fe85656a58/lib/events.js#L65
const { EventEmitter } = require("events");
const https = require("https");
const username = "username";
const password = "password";
var json;

// twitter 流客户端
const opt = {
  host: "stream.twitter.com",
  path: "/1/statuses/filter.json?track=chocolate",
  auth: username + ":" + password,
  method: "POST"
}

var req = https.request(opt, function(res) {
  res.setEncoding("utf-8");
  res.on("data", (data) => {
    json = JSON.parse(data);
    console.log("new data event", data);
  });
});

req.end();








