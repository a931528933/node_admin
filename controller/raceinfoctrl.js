var Router = require('koa-router');
var RaceInfo = require('../model/RaceInfo');
const escape = require('../core/Escape');
var ctrl = new Router();
ctrl.get('/raceinfo/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceInfo.all(param);
    ctx.response.body = res;
    
})
ctrl.get('/raceinfo/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await RaceInfo.count(param);
    
})
ctrl.post('/raceinfo/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param = escape.encode(param);
    var res = await RaceInfo.add(param);
    ctx.response.body = res;
})

ctrl.post('/raceinfo/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    console.log(param);
    param = escape.encode(param);
    var res = await RaceInfo.edit({_id:param._id},param);
    ctx.response.body = res;
})

ctrl.get('/raceinfo/remove',async(ctx,next) => {
    ctx.response.type = "text";
    var param = ctx.request.query;
    console.log(param);
    var res = await RaceInfo.remove(param);
    ctx.response.body = res; 
   
})

ctrl.get('/raceinfo/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceInfo.get(param);
    ctx.response.body = res;
})
module.exports = ctrl;