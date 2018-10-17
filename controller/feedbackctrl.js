var Router = require('koa-router');
var Feedback = require('../model/Feedback');
const escape = require('../core/Escape');
var ctrl = new Router();

ctrl.get('/feedback/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await Feedback.all(param);
    ctx.response.body = res;
    
})
ctrl.get('/feedback/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await Feedback.count(param);
    
})
ctrl.post('/feedback/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param = escape.encode(param);
    var res = await Feedback.add(param);
    ctx.response.body = res;
})

ctrl.post('/feedback/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    console.log(param);
    param = escape.encode(param);
    var res = await Feedback.edit({_id:param._id},param);
    ctx.response.body = res;
})

ctrl.get('/feedback/remove',async(ctx,next) => {
    ctx.response.type = "text";
    var param = ctx.request.query;
    console.log(param);
    var res = await Feedback.remove(param);
    ctx.response.body = res; 
   
})

ctrl.get('/feedback/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await Feedback.get(param);
    ctx.response.body = res;
})
module.exports = ctrl;