/**
 * Created by Enix on 3/11/2016.
 */
import * as pg from 'pg';
import { PostgreSQLDB } from "./PostgreSQLDB";
export declare class centralizedPostgreSQL extends PostgreSQLDB {
    pool: pg.Pool;
    private static _instance;
    constructor();
    static getInstance(): centralizedPostgreSQL;
    init(): void;
    getPool(param: any): pg.Pool;
}
