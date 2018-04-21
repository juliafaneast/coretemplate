/// <reference types="q" />
/**
 * Created by enixjin on 12/20/16.
 */
import * as pg from "pg";
import * as Q from "q";
import { baseDB } from "../baseDB";
export declare abstract class PostgreSQLDB implements baseDB {
    createPool(cfg: any, name: any): pg.Pool;
    abstract getPool(param: any): pg.Pool;
    abstract init(): any;
    query(sql: string, param: any, defer: Q.Deferred<any>, callback: (rows: any) => void, meid?: string): void;
}
