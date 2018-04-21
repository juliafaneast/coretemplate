/// <reference types="chai" />
/**
 * Created by Enix on 3/14/2016.
 */
import { dbType } from "../../db/baseDB";
export declare abstract class baseDomainObject extends Object {
    id: number;
    create_date: Date;
    update_date: Date;
    constructor();
    getTableName(): string;
    getRESTUrl(): string;
    getDBType(): dbType;
}
