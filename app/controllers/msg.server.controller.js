function sendMessage(req, res) {
    var package = {
        msg: req.body.msg,
        time: new Date(),
    }
    var from = req.session.user.username
    var to = req.body.to;
    if(!global.messageQueue[to]) global.messageQueue[to] = {};
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
module.exports = {
    send: sendMessage,
    get: getMessage
};