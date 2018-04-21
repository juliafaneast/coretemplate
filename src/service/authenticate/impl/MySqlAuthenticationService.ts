/**
 * Created by enixjin on 16-12-29.
 */
import {authenticationService} from "../authenticateService";
import * as Q from "q";
import {baseUserRepository} from "../../../domain/repository/baseUserRepository";
import {baseUser} from "../../../domain/entity/baseUser";

export class MySqlAuthenticationService implements authenticationService {
    private static _instance: MySqlAuthenticationService = new MySqlAuthenticationService();

    public static getInstance(): MySqlAuthenticationService {
        return MySqlAuthenticationService._instance;
    }

    login<T extends baseUserRepository<U>,U extends baseUser>(username: string, password: string, userRepository: T): Q.Promise<any> {
        return userRepository.login(username, password);
    }
}