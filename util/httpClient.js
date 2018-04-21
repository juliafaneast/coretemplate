"use strict";
/**
 * Created by enixjin on 4/7/16.
 */
var http = require('http');
var winston = require('winston');
var Q = require('q');
var serviceException_1 = require("../exception/serviceException");
var tools_1 = require("./tools");
var config = require(process.cwd() + '/config');
function get(path, meid) {
    if (config.pushCommandToDataServer) {
        var defer_1 = Q.defer();
        var hash = 0;
        if (meid) {
            hash = tools_1.tools.getHash(meid);
        }
        var options = {
            host: config.dataServerWorkers[hash].host,
            port: config.dataServerWorkers[hash].commandPort,
            path: '/'
        };
        winston.info("sending request to data server" + options.host + ", port:" + options.port + ", path:" + path);
        options.path = path;
        var data_1 = '';
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data_1 += chunk;
            });
            res.on('end', function () {
                if (res.statusCode !== 200) {
                    winston.error("request failed, statusCode:" + res.statusCode + ", data:" + data_1);
                    var errObj = JSON.parse(data_1);
                    defer_1.reject(new serviceException_1.serviceException(errObj.errorCode.toString()));
                }
                else {
                    winston.debug("http received:" + data_1);
                    defer_1.resolve(data_1);
                }
            });
        });
        req.on('error', function (e) {
            winston.error("problem with http request(" + path + "):" + e.message);
            defer_1.reject(new serviceException_1.serviceException("ERR_DATAServer", e.message));
        });
        req.end();
        return defer_1.promise;
    }
    else {
        winston.info("mocking request to data server, path:" + path);
        return Q.resolve('done');
    }
}
exports.get = get;
//# sourceMappingURL=httpClient.js.map