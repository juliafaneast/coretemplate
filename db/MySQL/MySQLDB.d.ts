/// <reference types="q" />
/**
 * Created by enixjin on 12/20/16.
 */
import * as mysql from "mysql";
import * as Q from "q";
import { baseDB } from "../baseDB";
export declare abstract class MySQLDB implements baseDB {
    createPool(cfg: any, name: any): mysql.IPool;
    abstract getPool(param: any): mysql.IPool;
    abstract init(): any;
    query(sql: string, param: any, defer: Q.Deferred<any>, callback: (rows: any) => void, meid?: string): void;
}
