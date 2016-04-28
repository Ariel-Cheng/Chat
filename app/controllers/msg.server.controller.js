var mongoose = require("mongoose");
var User = mongoose.model("User");
function sendMessage(req, res) {
    var package = {
        msg: req.body.msg,
        time: new Date(),
    }
    var from = req.session.user.username
    var to = req.body.to;
    if (!global.messageQueue[to]) global.messageQueue[to] = {};
    if (!global.messageQueue[to][from]) global.messageQueue[to][from] = [];
    global.messageQueue[to][from].push(package);
    res.json({
        status: 1
    })
}
function getMessage(req, res) {
    var who = req.body.to;
    var me = req.session.user.username;
    var msg = global.messageQueue[me][who];
    global.messageQueue[me][who] = [];
    res.json({ msg: msg });
}
function search(req, res) {
    var username = req.body.username || " ";
    var regex = new RegExp(username, 'i');
    User.find({ username: regex }, 'username nickname -_id').exec(function (err, users) {
        if (err) {
            res.json({
                status: 0,
                errInfo: err.toString()
            });
        } else {
            res.json(users)
        }
    });
}

function addFriend(req, res) {
    var username = req.session.user.username;
    var newFriend = req.body.friend;
    User.findOne({ username: newFriend }, function (err, friend) {
        if (err) {
            res.json({
                status: 0,
                errInfo: err.toString()
            })
        } else {
            if (friend) {
                var flag = false;
                for (var i = 0; i < req.session.user.friends.length; i++) {
                    if (req.session.user.friends[i].username == friend.username) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    res.json({
                        status: 0,
                        errInfo: friend.username + " 已是您的好友！"
                    })
                } else {
                    req.session.user.friends.push({
                        nickname: friend.nickname,
                        username: friend.username
                    })

                    User.findOneAndUpdate({ username: username }, {
                        password: req.session.user.password,
                        username: req.session.user.username,
                        salt: req.session.user.salt,
                        nickname: req.session.user.nickname,
                        friends: req.session.user.friends
                    }, function (err, user) {
                        if (err) {
                            res.json({
                                status: 0,
                                errInfo: err.toString()
                            })
                        } else {
                            res.json({
                                status: 1
                            });
                        }
                    })
                }


            } else {
                res.json({
                    status: 0,
                    errInfo: "好友帐号不存在！"
                })
            }
        }
    });
}

function getFriendList(req, res) {
    res.json({ friends: req.session.user.friends });
}
module.exports = {
    send: sendMessage,
    get: getMessage,
    searchUser: search,
    addFriend: addFriend,
    getFriendList: getFriendList
};