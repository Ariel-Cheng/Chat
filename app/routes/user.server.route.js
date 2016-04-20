/**
 *@description: user router
 *@author: LiuJ
 *@date: 2016/4/20
 */
var user = require("../controllers/user.server.controller.js");
module.exports = function (app) {
    app.get("/", user.checkLogin, function (req, res) {
        res.render("chat");
    });
    app.get("/login", function(req, res){
        res.render("login");
    })
    app.get("/signup", function(req, res){
        res.render("signup");
    })
    app.post("/signup", user.signup);
    app.post("/login", user.login);
};

