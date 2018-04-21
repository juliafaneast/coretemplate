"use strict";
var winston = require("winston");
var JPushMessageService = (function () {
    function JPushMessageService() {
    }
    JPushMessageService.prototype.getInstance = function () {
        return JPushMessageService._instance;
    };
    JPushMessageService.prototype.pushMessage = function (message) {
        //TBD
        winston.info("push message to App.");
        return null;
    };
    JPushMessageService._instance = new JPushMessageService();
    return JPushMessageService;
}());
exports.JPushMessageService = JPushMessageService;
