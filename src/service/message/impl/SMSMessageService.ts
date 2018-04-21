/**
 * Created by enixjin on 16-12-29.
 */
import {messageService} from "../messageService";
import * as winston from "winston";

export class SMSMessageService implements messageService {
    private static _instance : SMSMessageService = new SMSMessageService();
    public getInstance() : SMSMessageService {
        return SMSMessageService._instance;
    }
    pushMessage(message: any): boolean {
        //TBD
        winston.info("send message to phone.");
        return null;
    }
}