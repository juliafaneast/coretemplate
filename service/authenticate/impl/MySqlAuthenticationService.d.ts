/// <reference types="q" />
/**
 * Created by enixjin on 16-12-29.
 */
import { authenticationService } from "../authenticateService";
import * as Q from "q";
export declare class MySqlAuthenticationService implements authenticationService {
    private static _instance;
    static getInstance(): MySqlAuthenticationService;
    login(username: string, password: string): Q.Promise<any>;
}
