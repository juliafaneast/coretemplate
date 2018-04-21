/**
 * Created by FD1 on 2017/4/22.
 */
import {assert, expect} from 'chai';
import * as Q from 'q';
import * as winston from "winston";
import {EmailMessageService, TemplateEmail} from "../EmailMessageService";

describe("sendEmail test", function () {
    let _transport = {
        service: 'mailServer',
        auth: {
            user: 'mailAddress',
            pass: 'mailPassword'
        }
    };
    let _mailOption = {
        from: 'julia.zhang@uniquesoft.com', // sender address
        to: 'bar@blurdybloop.com, tom@163.com ,1401357930@qq.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    let templateEmail = new TemplateEmail();
        templateEmail._transport = _transport;
        templateEmail._mailOption = _mailOption;
    describe("sendEmail test ", function () {
        it("should success when pass correct mail content format", (done) => {
            let emailMessageService: EmailMessageService = EmailMessageService.getInstance();
            emailMessageService.sendTemplateEmail(templateEmail).then(
                (error) => {
                    if (error) {
                        done("send email failed");
                    } else {
                        done("send email successfully");
                    }
                }
            );
        });
    });

});
