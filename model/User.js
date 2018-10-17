var Db = require('../core/Db');
var moment = require('moment');
var IO = require('../core/IO');
const public = require('../config');
var model;

function init() {
    var Schema = Db.main.Schema;
    var UserSchema = new Schema({
        user_name: { type: String },
        user_pass: { type: String },
        user_phone: { type: String },
        wx_id: { type: String },
        real_name: { type: String  ,default: null},
        class: { type: String },
        user_type: { type: Number },
        logo: { type: String  ,default: null},
        area_id: { type: String },
        qq: { type: String  ,default: null},
        detail: { type: String  ,default: null},
        create_time: { type: Date ,default:Date.now }
    })
    model = Db.main.model('user', UserSchema);
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
    console.log(i);
    var exactly = {};
    var unexactly = {
        user_phone : i.user_phone,
        user_name : i.user_name,
        real_name : i.real_name,
        qq : i.qq,
        detail : i.detail               
    };
    var query = {};
    if(model.whereLike(unexactly)!=null){
        query.$or = model.whereLike(unexactly);
    }
    if(model.condition(exactly)!=null){
        query.$and = model.condition(exactly);
    } 
        try {
        return setInfo(await model.find(query).whereTime(time).count().exec());
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
    var exactly = {};
    var unexactly = {
        user_phone : i.user_phone,
        user_name : i.user_name,
        real_name : i.real_name,
        qq : i.qq,
        detail : i.detail               
    };
    var query = {};
    if(model.whereLike(unexactly)!=null){
        query.$or = model.whereLike(unexactly);
    }
    if(model.condition(exactly)!=null){
        query.$and = model.condition(exactly);
    } 
    console.log(i);
        try {
        return setInfo(await model.find(query).whereTime(time).sortTime('down').skip(i.page * 10)
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
    var obj = await this.get(i);
    console.log(public.__STATIC__+obj.info[0].logo);
    IO.del(public.__STATIC__+obj.info[0].logo);
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
    console.log('51'+u.logo);
    if(u.logo != undefined )
    {
        var obj = await this.get({_id:i._id});
        //console.log(public.__STATIC__+obj.info[0].logo);
        IO.del(public.__STATIC__+obj.info[0].logo);
    }else{
        delete u.logo;
    }
    
   
        return setInfo(await model.vaildate(i).vaildate(u).updateOne(i, u));
   

} 