var Router = require('koa-router');
var RaceHistory = require('../model/RaceHistory');
const escape = require('../core/Escape');
var ctrl = new Router();
ctrl.get('/racehistory/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceHistory.all(param);
    ctx.response.body = res;
    
})
ctrl.get('/user/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await User.count(param);
    
})
ctrl.post('/racehistory/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param = escape.encode(param);
    var res = await RaceHistory.add(param);
    ctx.response.body = res;
})

ctrl.post('/racehistory/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    console.log(param);
    param = escape.encode(param);
    var res = await RaceHistory.edit({_id:param._id},param);
    ctx.response.body = res;
})

ctrl.get('/racehistory/remove',async(ctx,next) => {
    ctx.response.type = "text";
    var param = ctx.request.query;
    console.log(param);
    var res = await RaceHistory.remove(param);
    ctx.response.body = res; 
   
})

ctrl.get('/racehistory/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceHistory.get(param);
    ctx.response.body = res;
})
module.exports = ctrl;