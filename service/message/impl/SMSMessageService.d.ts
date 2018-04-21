/**
 * Created by enixjin on 16-12-29.
 */
import { messageService } from "../messageService";
export declare class SMSMessageService implements messageService {
    private static _instance;
    getInstance(): SMSMessageService;
    pushMessage(message: any): boolean;
}
