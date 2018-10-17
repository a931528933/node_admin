const Koa = require('koa');
const os = require('os');
var _ = require('lodash');
var ps = require('current-processes');
const path = require('./config');
const app = new Koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
const koaBody = require('koa-body');
const static = require('koa-static')
const userctrl = require('./controller/userctrl');
const areactrl = require('./controller/areactrl');
const indexctrl = require('./controller/indexctrl');
const feedbackctrl = require('./controller/feedbackctrl');
const raceinfoctrl = require('./controller/raceinfoctrl');
const racehistoryctrl = require('./controller/racehistoryctrl');
const racegroupctrl = require('./controller/racegroupctrl');
var times = 0;
app.use(async (ctx, next) => {
    times++;
    console.log(times);
    await next();
})
app.use(static(path.__STATIC__));
app.use(koaBody({ multipart: true }));
app.use(indexctrl.routes());
app.use(userctrl.routes());
app.use(areactrl.routes());
app.use(feedbackctrl.routes());
app.use(raceinfoctrl.routes());
app.use(racehistoryctrl.routes());
app.use(racegroupctrl.routes());
var timer = ()=>{
    inter = setTimeout(() => {

        ps.get(function (err, processes) {
            var totalcpu = 0;
            var totalram = 0;
            for(var i in processes)
            {
                totalcpu+=processes[i].cpu;
                totalram+=processes[i].mem.usage;
            }
            io.emit('sysinfo', { cpu: totalcpu, ram: parseInt(totalram)});
            timer();
        });
       
    }, 2000)
} 
timer();
io.on('connection', function (socket) {
        
});

server.listen(80);