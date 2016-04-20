module.exports = {
    // development configuration options
    sessionSecret: "developmentSessionSecret",
    db: "mongodb://127.0.0.1/chat-dev",
    statics: "./public",
    staticsOptions: {
        dotfiles: 'ignore',
        etag: true,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '0',
        redirect: false,
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now());
        }
    },
    port: 80
};