/**
 * Created by enixjin on 16-12-29.
 */
import { messageService } from "../messageService";
export declare class EmailMessageService implements messageService {
    private static _instance;
    getInstance(): EmailMessageService;
    pushMessage(message: any): boolean;
}
