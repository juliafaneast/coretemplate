/**
 * Created by dannyzhu on 12/21/16.
 */
import * as Q from "q";

export interface authenticationService {
    login(username: string, password: string, repository?: any): Q.Promise<any>;
}






