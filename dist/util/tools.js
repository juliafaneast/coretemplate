"use strict";
var crypto = require('crypto');
var tools;
(function (tools) {
    var charsetNumber = '1234567890';
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
    tools.isEmptyObject = isEmptyObject;
    function fillToLength(original, length) {
        var shex = original ? original.toString(16) : "";
        if (shex.length > length * 2) {
            throw new Error("Illegal data length in fillToLength(): " + original + ".length > " + length);
        }
        while (shex.length < length * 2) {
            shex = '0' + shex;
        }
        return shex;
    }
    tools.fillToLength = fillToLength;
    function getHash(indicator) {
        var config = global.config;
        var dbCount = config.distributedDBs.length;
        var last = indicator.slice(-1);
        if (isNaN(parseInt(last[0]))) {
            return 0;
        }
        else {
            return last[0] % dbCount;
        }
    }
    tools.getHash = getHash;
    function getIpAddress(req) {
        var ipAddress;
        var headers = req.headers;
        var forwardedIpsStr = headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
        }
        return ipAddress;
    }
    tools.getIpAddress = getIpAddress;
    function isErrorCountReset(first_time, minute) {
        var flag = false;
        var betweenTime = new Date().getTime() - first_time.getTime();
        if (betweenTime > (1000 * 60 * minute)) {
            flag = true;
        }
        return flag;
    }
    tools.isErrorCountReset = isErrorCountReset;
    function generateRandomNumber(length) {
        return generateRandom(length, charsetNumber);
    }
    tools.generateRandomNumber = generateRandomNumber;
    function generateRandom(length, charset) {
        var result = '';
        while (result.length < length) {
            var bf = void 0;
            try {
                bf = crypto.randomBytes(length);
            }
            catch (e) {
                continue;
            }
            for (var i = 0; i < bf.length; i++) {
                var index = bf.readUInt8(i) % charset.length;
                result += charset.charAt(index);
            }
        }
        return result;
    }
})(tools = exports.tools || (exports.tools = {}));
//# sourceMappingURL=tools.js.map