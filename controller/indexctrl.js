var Router = require('koa-router');
var fs = require('fs');
var path = require('path');
var os = require('os');
var ctrl = new Router();
ctrl.get('/',(ctx,next) => {
    ctx.response.type = "html";
    var param = ctx.request.query;
    ctx.response.body = fs.readFileSync(__dirname+'/../index.html');
})
ctrl.get('/en',(ctx,next) => {
    ctx.response.type = "html";
    var param = ctx.request.query;
    ctx.response.body = fs.readFileSync(__dirname+'/../index-en.html');
})
module.exports = ctrl;