"use strict";
var winston = require("winston");
var nodemailer = require('nodemailer');
var EmailMessageService = (function () {
    function EmailMessageService() {
    }
    EmailMessageService.prototype.getInstance = function () {
        return EmailMessageService._instance;
    };
    EmailMessageService.prototype.sendTemplateEmail = function (emailMessage) {
        var transporter = nodemailer.createTransport(emailMessage._transport);
        transporter.sendMail(emailMessage._mailOption, function (error, info) {
            if (error) {
                return winston.info(error);
            }
            return winston.info('Message %s sent: %s', info.messageId, info.response);
        });
    };
    EmailMessageService._instance = new EmailMessageService();
    return EmailMessageService;
}());
exports.EmailMessageService = EmailMessageService;
var TemplateEmail = (function () {
    function TemplateEmail() {
    }
    return TemplateEmail;
}());
exports.TemplateEmail = TemplateEmail;
