var mongoose = require("mongoose");
var User = mongoose.model("User");
function signup(req, res) {
    var user = new User(req.body);
    User.findOne({ username: user.username }, function (err, _user) {
        if (err) res.json({
            status: 0,
            errInfo: err
        })
        if (_user) {
            res.json({
                status: 0,
                errInfo: "用户名已被占用，请重新输入用户名"
            })
        } else {
            user.save(function (err) {
                if (err) res.json({
                    status: 0,
                    errInfo: err
                })
                else res.json({
                    status: 1,
                })
            });
        }
    })

}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    User.findOne({username: username }, function (err, user) {
        console.log(user);
        if (!user) {
            res.json({
                status: 0,
                errInfo: "用户不存在！"
            })
        } else {
            if (user.authenticate(password)) {
                req.session.regenerate(function () {
                    req.session.user = user;
                    if(!global.messageQueue[user.username]) global.messageQueue[user.username] = []; // declare message queue
                    res.json({
                        status: 1,
                        errInfo: "登录成功"
                    })
                });
            } else {
                res.json({
                    status: 0,
                    errInfo: "密码错误！"
                })
            }
        }
    })
}

function checkLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}
module.exports = {
    signup: signup,
    login: login,
    checkLogin: checkLogin
};