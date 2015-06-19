var url = require('url');
var path = require('path');
var fs = require('fs');
var specUtils = require(path.join(global.pathToApp, 'core/lib/specUtils'));

var prevRef = 'http://google.com';

// Search requested resource in ref path first
var searchInRefPath = function(req, res, next){
    var originalUrl = req.originalUrl;
    var ref = req.headers && req.headers.referer ? req.headers.referer : prevRef;

    // caching last ref for .map requests without ref
    prevRef = ref;

    var parsedRefUrl = url.parse(ref);
    var refPath = parsedRefUrl.pathname;
    var parsedSpecPath = specUtils.parseSpecUrlPath(parsedRefUrl.pathname);
    var specInfo = specUtils.getSpecInfo(parsedSpecPath.pathToSpec);

    if (specInfo && specInfo.custom && specInfo.custom.bowerRoute) {
        originalUrl = path.join(specInfo.custom.bowerRoute, originalUrl)
    }

    var filePathToCheck = path.join(global.app.get('user'), refPath, originalUrl);

    fs.exists(filePathToCheck, function (exists) {
        if (exists) {
            res.sendFile(filePathToCheck);
        } else {
            next();
        }
    });
};

global.app.use('/bower_components', searchInRefPath);
global.app.use('/templates', searchInRefPath);