const os = require('os');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const public = require('../config');
const IO = require('./IO');
var type;
var upload = async function (ctx, type) {
  var date = new Date();
  var timestamp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDay() + 1);
  const uploaddir = (function (t) {
    type = t;
    return public.__UPLOAD__ + '/' + t + '/' + timestamp;

  })(type);
  const filePaths = [];
  const files = ctx.request.files || {};
  //console.log(files);
  if (Object.keys(files).length == 0) {
    return undefined;
  }
  if (!fs.existsSync(uploaddir)) {
    fs.mkdirSync(uploaddir);
  }
  
  for (let key in files) {
    
    const file = files[key];
    var timerandom = new Date().getTime().toString();
    const hash = crypto.createHash('sha1');
    hash.update(timerandom);
    var hexname = hash.digest('hex')+path.extname(file.name);
    const filePath = path.join(uploaddir,hexname);
    // const reader = await fs.createReadStream(file.path);
    // const writer = await fs.createWriteStream(filePath);
    // await reader.pipe(writer);
    if(await IO.write(filePath,file.path)){
      filePaths.push('upload/' + type + '/' + timestamp + '/' + hexname);
    }
  }

  return filePaths.join(',');
  //   ctx.body = filePaths;
};
module.exports.up = upload;