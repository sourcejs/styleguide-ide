var fs = require('fs-extra');
var path = require('path');
var deepExtend = require('deep-extend');

var config = {
    dataPath: path.join(__dirname, '../test-project/node_modules/sourcejs-contrib-status/data', 'status.json')
};

var write = module.exports.write = function(data){
    fs.ensureDirSync(path.dirname(config.dataPath));
    fs.writeJsonSync(config.dataPath, data);
};

var read = module.exports.read = function(){
    return fs.readJsonSync(config.dataPath, {throws: false})
};

module.exports.update = function(name, obj){
    var prevData = read();
    var writeObj = {};

    if (prevData) {
        deepExtend(writeObj, prevData)
    }

    writeObj[name] = obj;

    write(writeObj);
};