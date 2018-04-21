"use strict";
var winston = require("winston");
var WeChatMessageService = (function () {
    function WeChatMessageService() {
    }
    WeChatMessageService.prototype.getInstance = function () {
        return WeChatMessageService._instance;
    };
    WeChatMessageService.prototype.pushMessage = function (message) {
        //TBD
        winston.info("push message to Wechat.");
        return null;
    };
    WeChatMessageService._instance = new WeChatMessageService();
    return WeChatMessageService;
}());
exports.WeChatMessageService = WeChatMessageService;
//# sourceMappingURL=WeChatMessageService.js.map