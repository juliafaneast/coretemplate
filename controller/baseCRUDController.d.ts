/**
 * Created by enixjin on 3/21/16.
 */
import { baseController } from "./baseController";
import { baseRepository } from "../domain/repository/baseRepository";
import { baseDomainObject } from "../domain/entity/baseDomainObject";
export declare abstract class baseCRUDController<R extends baseDomainObject, T extends baseRepository<R>> extends baseController {
    protected _domainObject: any;
    protected _repository: any;
    repository: T;
    constructor(_domainObject: any, _repository: any);
    createCRUD(): void;
}
