var fs = require('fs');
var path = require('path');

var currentDirFiles = fs.readdirSync(__dirname);

currentDirFiles.forEach(function(file) {
    if (path.extname(file) !== '.js') return;

    try {
        require('./' + file);
    } catch(e) {
        console.log('Error importing router ' + file, e);
    }
});