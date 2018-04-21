/**
 * Created by enixjin on 16-12-29.
 */
import {serviceFactory} from "../serviceFactory";
import * as winston from "winston";
import {JPushMessageService} from "../message/impl/JPushMessageService";
import {messageService} from "../message/messageService";
import {authenticationService} from "../authenticate/authenticateService";
import {PAMAuthenticationService} from "../authenticate/impl/PAMAuthenticationService";
import {MySqlAuthenticationService} from "../authenticate/impl/MySqlAuthenticationService";
import {WeChatMessageService} from "../message/impl/WeChatMessageService";
import {SMSMessageService} from "../message/impl/SMSMessageService";
import {EmailMessageService} from "../message/impl/EmailMessageService";
export class serviceFactoryImpl implements serviceFactory {
    private static _instance: serviceFactoryImpl = new serviceFactoryImpl();
    private static _config;

    public static getInstance(): serviceFactory {
        return serviceFactoryImpl._instance;
    }

    getMessageService(type: "jpush"|"wechat"|"sms"|"email"): messageService {
        switch (type) {
            case "jpush" : {
                return new JPushMessageService().getInstance();
            }
            case "wechat" : {
                return new WeChatMessageService().getInstance();
            }
            case "sms" : {
                return new SMSMessageService().getInstance();
            }
            case "email" : {
                return new EmailMessageService().getInstance();
            }
        }
    }

    getAuthenticationService(): authenticationService {
        let config = global.config;
        switch (config.loginType) {
            case "PAM" : {
                winston.info("init PAM Authentication Service.");
                return PAMAuthenticationService.getInstance();
            }
            case "MySQL" : {
                winston.info("init MySql Authentication Service.");
                return MySqlAuthenticationService.getInstance();
            }
            default : {
                winston.error(`invalid login service type[${config.loginType}]!`);
                return null;
            }
        }
    }

    getConfig(): any {
        return serviceFactoryImpl._config;
    }

    setConfig(config: any) {
        serviceFactoryImpl._config = config;
    }

}