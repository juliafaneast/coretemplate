"use strict";
var winston = require("winston");
var JPushMessageService_1 = require("../message/impl/JPushMessageService");
var PAMAuthenticationService_1 = require("../authenticate/impl/PAMAuthenticationService");
var MySqlAuthenticationService_1 = require("../authenticate/impl/MySqlAuthenticationService");
var WeChatMessageService_1 = require("../message/impl/WeChatMessageService");
var SMSMessageService_1 = require("../message/impl/SMSMessageService");
var EmailMessageService_1 = require("../message/impl/EmailMessageService");
var serviceFactoryImpl = (function () {
    function serviceFactoryImpl() {
    }
    serviceFactoryImpl.getInstance = function () {
        return serviceFactoryImpl._instance;
    };
    serviceFactoryImpl.prototype.getMessageService = function (type) {
        switch (type) {
            case "jpush": {
                return new JPushMessageService_1.JPushMessageService().getInstance();
            }
            case "wechat": {
                return new WeChatMessageService_1.WeChatMessageService().getInstance();
            }
            case "sms": {
                return new SMSMessageService_1.SMSMessageService().getInstance();
            }
            case "email": {
                return new EmailMessageService_1.EmailMessageService().getInstance();
            }
        }
    };
    serviceFactoryImpl.prototype.getAuthenticationService = function () {
        var config = global.config;
        switch (config.loginType) {
            case "PAM": {
                winston.info("init PAM Authentication Service.");
                return PAMAuthenticationService_1.PAMAuthenticationService.getInstance();
            }
            case "MySQL": {
                winston.info("init MySql Authentication Service.");
                return MySqlAuthenticationService_1.MySqlAuthenticationService.getInstance();
            }
            default: {
                winston.error("invalid login service type[" + config.loginType + "]!");
                return null;
            }
        }
    };
    serviceFactoryImpl.prototype.getConfig = function () {
        return serviceFactoryImpl._config;
    };
    serviceFactoryImpl.prototype.setConfig = function (config) {
        serviceFactoryImpl._config = config;
    };
    serviceFactoryImpl._instance = new serviceFactoryImpl();
    return serviceFactoryImpl;
}());
exports.serviceFactoryImpl = serviceFactoryImpl;
