var Router = require('koa-router');
var Area = require('../model/Area');
const escape = require('../core/Escape');
var ctrl = new Router();

ctrl.get('/area/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    ctx.response.body =await Area.all(param);
    
})

ctrl.post('/area/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param = escape.encode(param);
    ctx.response.body =await Area.add(param);
})

ctrl.post('/area/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    console.log(param);
    param = escape.encode(param);
    ctx.response.body =await Area.edit({_id:param._id},param);
})
ctrl.get('/area/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await Area.count(param);
    
})
ctrl.get('/area/remove',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    ctx.response.body =await Area.remove(param);
})

ctrl.get('/area/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    ctx.response.body =await Area.get(param);
})
module.exports = ctrl;