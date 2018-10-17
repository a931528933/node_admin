var mongoose = require('mongoose');
var moment = require('moment');
mongoose.connect('mongodb://wechat:zjh0982@120.77.37.87:27017/gdupt', { useNewUrlParser: true }); function connect() {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('ok')
    });
}
mongoose.Query.prototype.whereTime = whereTime;
mongoose.Query.prototype.sortTime = sortTime;
mongoose.Model.whereLike = whereLike;
mongoose.Model.condition = condition;
mongoose.Model.vaildate = vaildate;

function vaildate(obj) {
    console.log(obj);
    var arr = Object.keys(obj);
    if (arr.length == 0) {
        return null;
    } else {
        return this;
    }
}
function whereLike(i){
    var $or = [];
    console.log(i);
    if(vaildate(i) == null)
    {
        return null;
    }
    for(var o in i)
    {
        console.log(o+" "+i[o]);
        var regex = new RegExp(i[o],'i');
        var temp = {};
        temp[o] = {};
        temp[o].$regex = regex;
        $or.push(temp);
    }
    return $or;
}
function condition(i){
    var $and = [];
    console.log(i);
    if(vaildate(i) == null)
    {
        return null;
    }
    for(var o in i)
    {
        console.log(o+" "+i[o]);
        var temp = {};
        temp[o] = {};
        temp[o] = i[o];
        $and.push(temp);
    }
    return $and;
}
function sortTime(type) {
    if (type == 'up') {
        return this;
    } else if (type == 'down') {
        return this.sort({ 'create_time': -1 });
    } else {
        return this.sort({ 'create_time': -1 });
    }

}
function whereTime(time) {
    if (typeof time == 'object') {
        return this.gte('create_time', time.startTime).lte('create_time', time.endTime);
    } else if (time == 'null') {
        return this;
    } else {
        console.log(moment().startOf(time).toISOString());
        return this.gte('create_time', moment().startOf(time).toISOString()).lte('create_time', moment().endOf(time).toISOString());
    }
}
var obj = {
    init: connect,
    main: mongoose,
    
}
module.exports = obj;