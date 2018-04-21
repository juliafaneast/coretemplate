/// <reference types="q" />
/**
 * Created by enixjin on 16-12-29.
 */
import { authenticationService } from "../authenticateService";
import * as Q from "q";
export declare class PAMAuthenticationService implements authenticationService {
    private static _instance;
    static getInstance(): PAMAuthenticationService;
    login(username: string, password: string): Q.Promise<any>;
}
