/// <reference types="q" />
/**
 * Created by enixjin on 12/13/16.
 */
import { User } from "../entity/User";
import * as Q from "q";
import { baseRepository } from "./baseRepository";
export declare class userRepository extends baseRepository<User> {
    private static _instance;
    constructor();
    static getInstance(): userRepository;
    update(user: User, id: number): Q.Promise<number>;
    login(username: string, password: string): Q.Promise<any>;
    changeNewPassword(newpassword: string, userid: any): Q.Promise<any>;
    generateJWT(user: any): string;
}
