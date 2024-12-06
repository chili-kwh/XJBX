const static = require("koa-static")
const path = require("path");

function staticPlugin({app, root}) {
    // app.use(static(path.resolve(root, 'index.html')))
    app.use(static(root))
    app.use(static(path.resolve(root, 'pub')))

}

module.exports = staticPlugin;