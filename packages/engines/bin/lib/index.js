const Koa = require('koa');
const staticPlugin = require('./plugins/static');
const rewritePlugin = require('./plugins/rewrite');

const app = new Koa();
const context = {
    app,
    root: process.cwd(),
}

const plugins = [
    rewritePlugin,
    staticPlugin,

]

plugins.forEach(plugin => {
    plugin(context)
})
// plugins.forEach(plugin => {plugin()})

// response
// app.use(ctx => {
//     ctx.body = 'Hello Koa';
// });

app.listen(3000);