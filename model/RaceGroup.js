var Db = require('../core/Db');
var moment = require('moment');
var model;
function init() {
    var Schema = Db.main.Schema;
    var RaceGroupSchema = new Schema({
        team_title: { type: String },
        introdution: { type: String },
        requirement: { type: String, default: null },
        people_limit: { type: Number },
        create_time: { type: Date, default: Date.now },
        end_time: { type: Date, default: null },
        tel_phone: { type: String },
        race_id: { type: String },
        area_id: { type: String},
    })
    model = Db.main.model('race_group', RaceGroupSchema);
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

module.exports.all = async (where) => {
    var i = where;
    console.log(where);
    console.log(new Date('2018-1-14 23:23:00').toISOString());

    var time = (function (timeType) {
        console.log(timeType);
        if (timeType == 'custom') {
            var temp = {};
            temp.startTime = moment.min(new Date(where.startTime + ' 00:00:00')).toISOString();
            temp.endTime = moment.max(new Date(where.endTime + ' 23:59:59')).toISOString();
            // console.log(temp);
            return temp;
        } else {
            return timeType;
        }
    })(where.timeType);
    delete i.timeType;
    delete i.startTime;
    delete i.endTime;
    console.log(i);
    try {

        return setInfo(await model.whereLike(i).whereTime(time).sortTime('down').exec());
    }
    catch (err) {
        info.success = 0;
        info.info = 'err';
        return info;
    }


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

    console.log(i);
        try {
        
        return setInfo(await model.whereLike(i).whereTime(time).sortTime('down').skip(i.page * 10)
        .limit(10).exec());
        }
        catch (err) {
            info.success = 0;
            info.info = 'err';
            return info;
        }
    

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