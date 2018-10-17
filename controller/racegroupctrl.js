var Router = require('koa-router');
var RaceGroup = require('../model/RaceGroup');
const escape = require('../core/Escape');
var ctrl = new Router();
ctrl.get('/racegroup/all',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceGroup.all(param);
    ctx.response.body = res;
    
})
ctrl.get('/user/count',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    console.log(param);
    ctx.response.body =await User.count(param);
    
})
ctrl.post('/racegroup/add',async(ctx,next) => {
    var param = ctx.request.body;
    ctx.response.type = "json";
    param = escape.encode(param);
    var res = await RaceGroup.add(param);
    ctx.response.body = res;
})

ctrl.post('/racegroup/edit',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.body;
    console.log(param);
    param = escape.encode(param);
    var res = await RaceGroup.edit({_id:param._id},param);
    ctx.response.body = res;
})

ctrl.get('/racegroup/remove',async(ctx,next) => {
    ctx.response.type = "text";
    var param = ctx.request.query;
    console.log(param);
    var res = await RaceGroup.remove(param);
    ctx.response.body = res; 
   
})

ctrl.get('/racegroup/getOne',async(ctx,next) => {
    ctx.response.type = "json";
    var param = ctx.request.query;
    var res = await RaceGroup.get(param);
    ctx.response.body = res;
})
module.exports = ctrl;