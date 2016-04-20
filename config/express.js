var config = require("./config");
var express = require("express");
var morgan = require("morgan"); //logger
var compress = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var path = require("path");
module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV == "development") {
        app.use(morgan("dev"));
    } else if (process.env.NODE_ENV == "production") {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: "500kb"
    }));
    app.use(bodyParser.json({ limit: "500kb" }));
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(express.query());

    global.messageQueue = { };
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.engine("ejs", require("ejs").renderFile);
    app.use(express.static(config.statics, config.staticsOptions)); // 设置静态资源路径

    require("../app/routes/user.server.route.js")(app);
    require("../app/routes/msg.server.route.js")(app);
    //The 404 Route (ALWAYS Keep this as the last route)
    app.use(function (err, req, res, next) {
        console.log(err);
        next(err);
    });
    return app;
};