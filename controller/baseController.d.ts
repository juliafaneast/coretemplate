/// <reference types="express" />
/// <reference types="q" />
/**
 * Created by Enix on 3/14/2016.
 */
import * as express from "express";
import * as Q from "q";
export declare abstract class baseController {
    router: express.Router;
    constructor();
    abstract initRouters(): any;
    getRouter(): express.Router;
    checkAuthentication(req: any, res: any, next: any): void;
    getAuthentication(req: any): Q.Promise<any>;
    get(url: string, callback: (req, res, next) => void, withAuth?: boolean): void;
    post(url: string, callback: (req, res, next) => void, withAuth?: boolean): void;
    put(url: string, callback: (req, res, next) => void): void;
    delete(url: string, callback: (req, res, next) => void): void;
    handleError(error: any, res: any, req?: any): void;
}
