/**
 * Created by enixjin on 16-12-29.
 */
import {messageService} from "../messageService";
import * as winston from "winston";

export class JPushMessageService implements messageService {
    private static _instance : JPushMessageService = new JPushMessageService();
    public getInstance() : JPushMessageService {
        return JPushMessageService._instance;
    }
    pushMessage(message: any): boolean {
        //TBD
        winston.info("push message to App.");
        return null;
    }
}