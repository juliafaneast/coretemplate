/**
 * Created by enixjin on 16-12-29.
 */
import { messageService } from "../messageService";
export declare class JPushMessageService implements messageService {
    private static _instance;
    getInstance(): JPushMessageService;
    pushMessage(message: any): boolean;
}
