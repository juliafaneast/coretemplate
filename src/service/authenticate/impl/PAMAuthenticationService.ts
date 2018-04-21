/**
 * Created by enixjin on 16-12-29.
 */
import {authenticationService} from "../authenticateService";
import * as Q from "q";
//import * as pam from "authenticate-pam";

export class PAMAuthenticationService implements authenticationService {
    private static _instance: PAMAuthenticationService = new PAMAuthenticationService();

    public static getInstance(): PAMAuthenticationService {
        return PAMAuthenticationService._instance;
    }

    login(username: string, password: string): Q.Promise<any> {
        /*
         pam.authenticate('username', 'password', function(err) {
         if(err) {
         return null;
         }
         else {
         winston.info("PAM Authenticated!");
         return new User(username);
         }
         });
         */
        return Q.resolve(null);
    }
}