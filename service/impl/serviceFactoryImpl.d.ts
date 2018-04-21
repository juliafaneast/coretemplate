/**
 * Created by enixjin on 16-12-29.
 */
import { serviceFactory } from "../serviceFactory";
import { messageService } from "../message/messageService";
import { authenticationService } from "../authenticate/authenticateService";
export declare class serviceFactoryImpl implements serviceFactory {
    private static _instance;
    private static _config;
    static getInstance(): serviceFactory;
    getMessageService(type: "jpush" | "wechat" | "sms" | "email"): messageService;
    getAuthenticationService(): authenticationService;
    getConfig(): any;
    setConfig(config: any): void;
}
