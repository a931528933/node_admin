function encode(param){
    var res = param;
    for(var i in res)
    {
        res[i] = encodeHtml(res[i]);
    }
    return res;
}
function decode(param){
    var res = param;
    for(var i in res)
    {
        res[i] = decodeHtml(res[i]);
    }
    return res;
}
function encodeHtml(str) {
    var s = "";
    if(str=='' || str == undefined) return "";
    s = str.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    s = s.replace(/ /g,"&nbsp;");
    s = s.replace(/\'/g,"&apos;");
    s = s.replace(/\"/g,"&quot;");
    return s; 
}
function decodeHtml(str) {
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&apos;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s; 
}
module.exports.encode = encode;
module.exports.decode = decode;