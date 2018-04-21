/**
 * Created by Enix on 3/11/2016.
 */
import * as mysql from "mysql";
import { MySQLDB } from "./MySQLDB";
export declare class distributedMySQL extends MySQLDB {
    pools: Array<mysql.IPool>;
    private static _instance;
    constructor();
    static getInstance(): distributedMySQL;
    init(): void;
    getPool(indicator: any): mysql.IPool;
    getDBByIndicator(indicator: any): mysql.IPool;
}
