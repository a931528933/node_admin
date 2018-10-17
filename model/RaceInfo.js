var Db = require('../core/Db');
var moment = require('moment');
var model;
function init() {
    var Schema = Db.main.Schema;
    var RaceInfoSchema = new Schema({
        title: { type: String },
        allow_people: { type: String },
        detail: { type: String ,default: null},
        class: { type: Number },
        state: { type: Number },
        start_time: { type: Date },
        end_time:{type: Date},
        create_time: { type: Date, default: Date.now },
        area_id: { type: String },
    })

    model = Db.main.model('race_info', RaceInfoSchema);
}
function setInfo(i) {
    var info = { success: 1, info: i };
    return info;
}

var info = { success: 0, info: "null" };
// 生成Model
init();
module.exports.add = async (args) => {
    var i = args;

    try {
        return setInfo(await model.vaildate(i).create(i));
    }
    catch (err) {
        info.success = 0;
        info.info = 'err';
        return info;
    }

}

module.exports.count = async (where) => {
    

    var i = where;
    console.log(where);
    console.log(new Date('2018-1-14 23:23:00').toISOString());

    var time = (function(timeType){
        console.log(timeType);
        if(timeType == 'custom')
        {
            var temp = {};
            temp.startTime = moment.min(new Date(where.startTime+' 00:00:00')).toISOString();
            temp.endTime = moment.max(new Date(where.endTime+' 23:59:59')).toISOString();
            // console.log(temp);
            return temp;
        }else{
            return timeType;
        }
    })(where.timeType);
    delete i.timeType;
    delete i.startTime;
    delete i.endTime;
    
    var exactly = {};
    if(i.class != '')
    {
        exactly.class = i.class;
    }
    if(i.state != '')
    {
        exactly.state = i.state;
    }
    var unexactly = {
        title : i.title,
        detail : i.detail
    };
    var query = {};
    if(model.whereLike(unexactly)!=null){
        query.$or = model.whereLike(unexactly);
    }
    if(model.condition(exactly)!=null){
        query.$and = model.condition(exactly);
    }  
    console.log(query.$and);
        return setInfo(await model.find(query).whereTime(time).count().exec());
    

}
module.exports.all = async (where) => {
   

    var i = where;
    console.log(where);
    console.log(new Date('2018-1-14 23:23:00').toISOString());

    var time = (function(timeType){
        console.log(timeType);
        if(timeType == 'custom')
        {
            var temp = {};
            temp.startTime = moment.min(new Date(where.startTime+' 00:00:00')).toISOString();
            temp.endTime = moment.max(new Date(where.endTime+' 23:59:59')).toISOString();
            // console.log(temp);
            return temp;
        }else{
            return timeType;
        }
    })(where.timeType);
    delete i.timeType;
    delete i.startTime;
    delete i.endTime;
    var exactly = {};
    if(i.class != '')
    {
        exactly.class = i.class;
    }
    if(i.state != '')
    {
        exactly.state = i.state;
    }
    var unexactly = {
        title : i.title,
        detail : i.detail
    };
    var query = {};
    if(model.whereLike(unexactly)!=null){
        query.$or = model.whereLike(unexactly);
    }
    console.log(exactly);
    if(model.condition(exactly)!=null){
        query.$and = model.condition(exactly);
    }    
        return setInfo(await model.find(query).whereTime(time).sortTime('down').skip(i.page * 10)
        .limit(10).exec());
}
module.exports.get = async (param) => {
    var i = param;
    console.log(i);
    try {
        return setInfo(await model.find(i));
    }
    catch (err) {
        info.success = 0;
        info.info = 'err';
        return info;
    }
}

module.exports.remove = async (where) => {
    var i = where;
    try {
        return setInfo(await model.vaildate(i).deleteOne(i));
    }
    catch (err) {
        info.success = 0;
        info.info = 'err';
        return info;
    }

}

module.exports.edit = async (where, updateobj) => {
    var i = where;
    var u = updateobj;
    try {
        return setInfo(await model.vaildate(i).vaildate(u).updateOne(i, u));
    }
    catch (err) {
        info.success = 0;
        info.info = 'err';
        return info;
    }

} 