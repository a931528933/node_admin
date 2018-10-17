const os = require('os');
const path = require('path');
const fs = require('fs');
async function write(filename,filePath)
{
    var dir = path.dirname(filename);
    if(!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }
   try {
    var reader = await fs.createReadStream(filePath);
    var writer = await fs.createWriteStream(filename);
    await reader.pipe(writer);
    return true;
   } catch (error) {
       return false;
   } 
}

async function read(filename)
{
    try {
        return await fs.readFile(filename);
    } catch (error) {
        return false;
    }
   
}

async function del(filename){
    fs.unlink(filename,(err)=>{
        state = true;
       });
}
module.exports.read = read;
module.exports.write = write;
module.exports.del = del;