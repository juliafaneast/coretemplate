import { authenticationService } from "./authenticate/authenticateService";
import { messageService } from "./message/messageService";
export interface serviceFactory {
    getMessageService(clientType: string): messageService;
    getAuthenticationService(): authenticationService;
    getConfig(): any;
    setConfig(config: any): any;
}
