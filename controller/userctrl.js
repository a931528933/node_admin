var Router = require('koa-router');
var User = require('../model/User');
const escape = require('../core/Escape');
var ctrl = new Router();
var uploader = require('../core/Uploader');
ctrl.get('/user/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await User.all(param);
    
})
ctrl.get('/user/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await User.count(param);
    
})
ctrl.post('/user/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param.logo = await uploader.up(ctx,'user');
    param = escape.encode(param);
    ctx.response.body =await User.add(param);
})

ctrl.post('/user/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    param.logo = await uploader.up(ctx,'user');
    param = escape.encode(param);
    ctx.response.body =await User.edit({_id:param._id},param);
})

ctrl.get('/user/remove',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    ctx.response.body =await User.remove(param);
})

ctrl.get('/user/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    ctx.response.body =await User.get(param);
})



module.exports = ctrl;