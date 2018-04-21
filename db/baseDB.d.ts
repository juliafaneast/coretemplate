/// <reference types="q" />
/**
 * Created by Enix on 3/11/2016.
 */
import * as mysql from "mysql";
import * as pg from "pg";
import * as Q from "q";
export interface baseDB {
    createPool(cfg: any, name: any): mysql.IPool | pg.Pool;
    getPool(param: any): mysql.IPool | pg.Pool;
    init(): any;
    query(sql: string, param: any, defer: Q.Deferred<any>, callback: (rows: any) => void, indicator?: string): any;
}
export declare function initDB(type: "MySQL" | "PostgreSQL"): void;
export declare enum dbType {
    distributed = 0,
    centralized = 1,
}
