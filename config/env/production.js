module.exports = {
	// production configuration options
	sessionSecret: "productionSessionSecret",
	db: "mongodb://127.0.0.1/chat",
	statics: "./statics",
	staticsOptions: {
		dotfiles: 'ignore',
		etag: true,
		extensions: ['htm', 'html'],
		index: false,
		maxAge: '30d',
		redirect: false,
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now());
		}
	},
	port: 3000
};
