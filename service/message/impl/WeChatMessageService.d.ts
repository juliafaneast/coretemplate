/**
 * Created by enixjin on 16-12-29.
 */
import { messageService } from "../messageService";
export declare class WeChatMessageService implements messageService {
    private static _instance;
    getInstance(): WeChatMessageService;
    pushMessage(message: any): boolean;
}
