/// <reference types="q" />
/**
 * Created by Enix on 3/15/2016.
 */
import * as Q from "q";
import { baseDomainObject } from "../entity/baseDomainObject";
import { dbType, baseDB } from "../../db/baseDB";
import { paginationRequest } from "../pagination/paginationRequest";
import { centralizedMySQL } from "../../db/MySQL/centralizedMySQL";
import { distributedMySQL } from "../../db/MySQL/distributedMySQL";
export declare abstract class baseRepository<T extends baseDomainObject> {
    protected _domainObject: any;
    domainObject: T;
    centralizedDB: centralizedMySQL;
    distributedDB: distributedMySQL;
    constructor(_domainObject: any);
    getDomainObject(): T;
    insert(objectToInsert: T, indicator?: string): Q.Promise<number>;
    queryByID(id: number, postProcess?: boolean, indicator?: string): Q.Promise<T>;
    listAll(postProcess?: boolean, indicator?: string): Q.Promise<Array<T>>;
    update(objectToUpdate: any, id: number, indicator?: string): Q.Promise<number>;
    updateAndRefresh(objectToUpdate: any, id: number, indicator?: string): Q.Promise<T>;
    delete(id: number, indicator?: string): Q.Promise<number>;
    search(query: any, indicator?: string): Q.Promise<Array<T>>;
    searchLike(query: any, indicator?: string): Q.Promise<Array<T>>;
    count(param: any, indicator?: string): Q.Promise<number>;
    countAllLike(paginationRequest: paginationRequest, param: any, indicator?: string): Q.Promise<any>;
    queryAllLike(paginationRequest: paginationRequest, param: any, indicator?: string): Q.Promise<any>;
    queryByCreateDate(startDate: Date, endDate: Date): Q.Promise<Array<baseDomainObject>>;
    protected getDB(type: dbType): baseDB;
    removeID(objectToUpdate: T): T;
    postProcess(domain: any): Q.Promise<any>;
    doSubQuery(domain: any): Q.Promise<{}>;
    removeNotExportable(domain: any): Q.Promise<{}>;
    getFields(objectToInsert: any): Array<string>;
    getConditionKey(query: string): string;
    getConditionArg(query: string): string[];
}
