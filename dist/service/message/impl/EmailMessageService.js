"use strict";
var winston = require("winston");
var EmailMessageService = (function () {
    function EmailMessageService() {
    }
    EmailMessageService.prototype.getInstance = function () {
        return EmailMessageService._instance;
    };
    EmailMessageService.prototype.pushMessage = function (message) {
        winston.info("send email.");
        return null;
    };
    EmailMessageService._instance = new EmailMessageService();
    return EmailMessageService;
}());
exports.EmailMessageService = EmailMessageService;
//# sourceMappingURL=EmailMessageService.js.map