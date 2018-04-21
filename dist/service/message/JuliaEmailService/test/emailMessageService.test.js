"use strict";
var EmailMessageService_1 = require("../EmailMessageService");
describe("sendEmail test", function () {
    var _transport = {
        service: 'mailServer',
        auth: {
            user: 'mailAddress',
            pass: 'mailPassword'
        }
    };
    var _mailOption = {
        from: 'julia.zhang@uniquesoft.com',
        to: 'bar@blurdybloop.com, tom@163.com ,1401357930@qq.com',
        subject: 'Hello ✔',
        text: 'Hello world ?',
        html: '<b>Hello world ?</b>'
    };
    var templateEmail = new EmailMessageService_1.TemplateEmail();
    templateEmail._transport = _transport;
    templateEmail._mailOption = _mailOption;
    describe("sendEmail test ", function () {
        it("should success when pass correct mail content format", function (done) {
            var emailMessageService = EmailMessageService_1.EmailMessageService.getInstance();
            emailMessageService.sendTemplateEmail(templateEmail).then(function (error) {
                if (error) {
                    done("send email failed");
                }
                else {
                    done("send email successfully");
                }
            });
        });
    });
});
//# sourceMappingURL=emailMessageService.test.js.map