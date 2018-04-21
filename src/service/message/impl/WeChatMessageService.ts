/**
 * Created by enixjin on 16-12-29.
 */
import {messageService} from "../messageService";
import * as winston from "winston";

export class WeChatMessageService implements messageService {
    private static _instance : WeChatMessageService = new WeChatMessageService();
    public getInstance() : WeChatMessageService {
        return WeChatMessageService._instance;
    }
    pushMessage(message: any): boolean {
        //TBD
        winston.info("push message to Wechat.");
        return null;
    }
}