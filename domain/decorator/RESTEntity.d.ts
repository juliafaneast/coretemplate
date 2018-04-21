/// <reference types="chai" />
/**
 * Created by enixjin on 5/12/16.
 */
import { dbType } from "../../db/baseDB";
import "reflect-metadata";
import { baseRepository } from "../repository/baseRepository";
export interface RESTEntityOption {
    table: string;
    URL: string;
    db: dbType;
}
export declare function RESTEntity(option: RESTEntityOption): (target: any) => void;
export declare function exportable(value: boolean): {
    (target: Function): void;
    (target: Object, targetKey: string | symbol): void;
};
export declare function getExportable(target: any, propertyKey: string): any;
export declare function subQuery(value: {
    name: string;
    repository: typeof baseRepository;
}): {
    (target: Function): void;
    (target: Object, targetKey: string | symbol): void;
};
export declare function getSubQuery(target: any, propertyKey: string): any;
