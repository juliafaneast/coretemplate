/**
 * Created by enixjin on 16-12-29.
 */
import {messageService} from "../messageService";
import * as winston from "winston";

export class EmailMessageService implements messageService {
    private static _instance: EmailMessageService = new EmailMessageService();

    public getInstance(): EmailMessageService {
        return EmailMessageService._instance;
    }

    pushMessage(message: any): boolean {
        //TBD
        winston.info("send email.");
        return null;
    }
}