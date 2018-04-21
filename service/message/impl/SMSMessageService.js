"use strict";
var winston = require("winston");
var SMSMessageService = (function () {
    function SMSMessageService() {
    }
    SMSMessageService.prototype.getInstance = function () {
        return SMSMessageService._instance;
    };
    SMSMessageService.prototype.pushMessage = function (message) {
        //TBD
        winston.info("send message to phone.");
        return null;
    };
    SMSMessageService._instance = new SMSMessageService();
    return SMSMessageService;
}());
exports.SMSMessageService = SMSMessageService;
//# sourceMappingURL=SMSMessageService.js.map