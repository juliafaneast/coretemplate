/**
 * Created by Enix on 3/11/2016.
 */
import * as mysql from 'mysql';
import { MySQLDB } from "./MySQLDB";
export declare class centralizedMySQL extends MySQLDB {
    pool: mysql.IPool;
    private static _instance;
    constructor();
    static getInstance(): centralizedMySQL;
    init(): void;
    getPool(param: any): mysql.IPool;
}
