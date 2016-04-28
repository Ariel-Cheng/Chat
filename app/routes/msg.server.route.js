/**
 *@description: msg router
 *@author: LiuJ
 *@date: 2016/4/20
 */
var msg = require("../controllers/msg.server.controller.js");
var user = require("../controllers/user.server.controller.js");
module.exports = function (app) {
   app.post("/send", user.checkLogin, msg.send);
   app.post("/get", user.checkLogin, msg.get);
   app.post("/searchUser", user.checkLogin, msg.searchUser);
   app.post("/addFriend", user.checkLogin, msg.addFriend);
   app.post("/getFriendList", user.checkLogin, msg.getFriendList);
};

