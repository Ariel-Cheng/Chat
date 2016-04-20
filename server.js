process.env.NODE_ENV = process.env.NODE_ENV || "development";
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var express = require("./config/express");
var db = require("./config/mongoose.js")();
var config = require("./config/config.js");
var app = express();
// 启动应用并开启监听端口
app.listen(config.port);
module.exports = app;
console.log("Server running at http://localhost: " + config.port + "\nusing version: " + process.env.NODE_ENV);
