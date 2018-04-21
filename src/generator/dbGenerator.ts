/**
 * Created by enixjin on 16-12-30.
 */

global.config = require("../../config");
const table_prefix: string = "";

import {initDB} from "../db/baseDB";
import {centralizedMySQL} from "../db/MySQL/centralizedMySQL";
import * as Q from 'q';

initDB("MySQL");
let defer = Q.defer<any>();
let total = 100;
let count = 0;
let path = process.argv[2];
let fs = require("fs");

//main
centralizedMySQL.getInstance().query("show tables", null, defer, (tables) => {
    let config = global.config;
    total = tables.length * 4;

    createDocFile();

    tables.forEach(
        (table, index) => {
            let ad = Q.defer<any>();
            centralizedMySQL.getInstance().query(
                "show columns in " + table["Tables_in_" + config.centralizedDB.database], null, ad, (columns) => {
                    console.log(`----generating object for table ${table["Tables_in_" + config.centralizedDB.database]}`);
                    generateEntity(table["Tables_in_" + config.centralizedDB.database], columns);
                    generateRepository(table["Tables_in_" + config.centralizedDB.database]);
                    generateController(table["Tables_in_" + config.centralizedDB.database]);
                    generateControllerDoc(table["Tables_in_" + config.centralizedDB.database], columns);
                }
            )
        }
    );
});

function createDocFile() {
    fs.mkdirSync(path + "controller");
    fs.mkdirSync(path + "repository");
    fs.mkdirSync(path + "entity");
    fs.mkdirSync(path + "controller/doc");
    let docfile = fs.openSync(path + "controller/doc/apidoc.js", "w");
    fs.writeSync(docfile, `/**
 * @apiDefine authorized
 * @apiHeader {String} jwt 用户登录token.
 * @apiError Unauthorized 用户没有登录.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "message contents"
 *     }
 */

/**
 * @api {post} /users/login login
 * @apiVersion 0.0.1
 * @apiName /users/login
 * @apiGroup User
 * @apiDescription 用户登录
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiSuccess {String} token  用户Token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVuaXgiLCJpYXQiOjE0NTc5Mzk0MjcsImV4cCI6MTQ1NzkzOTcyN30._TISwwnvlGUZwCLW5Wf75cNHZ7lEH3P_-8lfFqp1pcI"
 *     }
 * @apiError BadRequest 登录信息格式或内容错误
 * @apiErrorExample {json} Error-Response:
 *     Error 400: Bad Request
 *      {
 *          "message": "bad request"
 *      }
 */
 
 /**
 * @api {post} /users/register register
 * @apiVersion 0.0.1
 * @apiName /users/register
 * @apiGroup User
 * @apiDescription 创建用户
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiSuccess {String} token  用户Token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVuaXgiLCJpYXQiOjE0NTc5Mzk0MjcsImV4cCI6MTQ1NzkzOTcyN30._TISwwnvlGUZwCLW5Wf75cNHZ7lEH3P_-8lfFqp1pcI"
 *     }
 * @apiError BadRequest 创建格式或内容错误
 * @apiErrorExample {json} Error-Response:
 *     Error 400: Bad Request
 *      {
 *          "message": "bad request"
 *      }
 */

`);
}

function generateControllerDoc(tableName: string, columns: Array<any>) {
    let entityName = getEntityName(tableName);
    let docfile = fs.openSync(path + "controller/doc/apidoc.js", "a");
    fs.appendFileSync(docfile,
        `
        
/**
 * @api {post} /${getLowerFirst(entityName)}s create${entityName}
 * @apiVersion 0.0.1
 * @apiName create${entityName}
 * @apiGroup ${entityName}
 * @apiDescription create ${entityName}
 *
` + getDocColumns(columns) + `
 *
 * @apiSuccess {Number} id  ${entityName} id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       id:1
 *     }
 * @apiUse authorized
 */
 
 /**
 * @api {get} /${getLowerFirst(entityName)}s get${entityName}List
 * @apiVersion 0.0.1
 * @apiName get${entityName}List
 * @apiGroup ${entityName}
 * @apiDescription get ${entityName} list
 *
 * @apiSuccess {Number} id  ${entityName} id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        ... 
 *     ]
 * @apiUse authorized
 */
 
 /**
 * @api {get} /${getLowerFirst(entityName)}s/:id get${entityName}ByID
 * @apiVersion 0.0.1
 * @apiName get${entityName}ByID
 * @apiGroup ${entityName}
 * @apiDescription get ${entityName} by id.
 *
 * @apiSuccess {Number} id  ${entityName} id.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        ... 
 *     ]
 * @apiUse authorized
 */
 
 /**
 * @api {put} /${getLowerFirst(entityName)}s/:id update${entityName}
 * @apiVersion 0.0.1
 * @apiName update${entityName}
 * @apiGroup ${entityName}
 * @apiDescription update ${entityName} info.
 *
 * @apiParam {Number} id ${entityName} unique ID.
` + getDocColumns(columns) + `
 *
 * @apiSuccess {Number} affectedRows  rows updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "affectedRows": 1
 *     }
 * @apiUse authorized
 */
 
  /**
 * @api {delete} /${getLowerFirst(entityName)}s/:id delete${entityName}
 * @apiVersion 0.0.1
 * @apiName delete${entityName}
 * @apiGroup ${entityName}
 * @apiDescription delete ${entityName} by id.
 *
 * @apiParam {Number} id ${entityName} unique ID.
 *
 * @apiSuccess {Number} affectedRows  rows updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "affectedRows": 1
 *     }
 * @apiUse authorized
 */

`);
    count++;
    if (count == total) {
        console.log("done");
        process.exit();
    }
}

function generateController(tableName: string) {
    let entityName = getEntityName(tableName);
    let lowCaseName = getLowerFirst(entityName);
    let fileName = lowCaseName + "Controller.ts";
    fs.open(path + "controller/" + fileName, "w", (err, fd) => {
        fs.writeSync(fd, `import {baseCRUDController} from "core";
import {${lowCaseName}Repository} from "../repository/${lowCaseName}Repository";
import {${entityName}} from "../entity/${entityName}";

export class ${lowCaseName}Controller extends baseCRUDController<${entityName}, ${lowCaseName}Repository> {

    constructor() {
        super(${entityName}, ${lowCaseName}Repository);
    }

    initRouters() {
        let domainObject = new this._domainObject();

    }

}`);
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}

function generateRepository(tableName: string) {
    let entityName = getEntityName(tableName);
    let lowCaseName = getLowerFirst(entityName);
    let fileName = lowCaseName + "Repository.ts";
    fs.open(path + "repository/" + fileName, "w", (err, fd) => {
        fs.writeSync(fd,
            `import {${entityName}} from "../entity/${entityName}";
import * as winston from "winston";
import {baseRepository} from "core";

export class ${lowCaseName}Repository extends baseRepository<${entityName}> {
    private static _instance: ${lowCaseName}Repository = new ${lowCaseName}Repository();

    constructor() {
        super(${entityName});
        winston.info("init ${lowCaseName}Repository");
        if (${lowCaseName}Repository._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        ${lowCaseName}Repository._instance = this;
    }

    public static getInstance(): ${lowCaseName}Repository {
        return ${lowCaseName}Repository._instance;
    }

}`);
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}

function generateEntity(tableName: string, columns: Array<any>) {
    let entityName = getEntityName(tableName);
    let fileName = entityName + ".ts";
    fs.open(path + "entity/" + fileName, "w", (err, fd) => {
        fs.writeSync(fd,
            `
import {baseDomainObject} from "core";
import {dbType} from "core";
import {RESTEntity, exportable, subQuery} from "core";

@RESTEntity(
    {
        table: "${tableName}",
        URL: "/${getLowerFirst(entityName)}s",
        db: dbType.centralized
    })
export class ${entityName} extends baseDomainObject {
`
        );
        columns.filter(filterBaseDomain).forEach(
            column => {
                fs.writeSync(fd,
                    `
        ${column.Field}:${getTypeFromDB(column.Type)};`
                );
            }
        );
        fs.writeSync(fd, `
        
}
`);
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}

function getDocColumns(columns: Array<any>): string {
    let result = "";
    columns.filter(filterBaseDomain).forEach(
        column => {
            result +=` * @apiParam {${getTypeFromDB(column.Type)}} [${column.Field}] ${column.Field}.
`;
        });
    return result;
}

function getLowerFirst(str: string): string {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}

function getEntityName(tableName) {
    if (table_prefix) {
        tableName = tableName.substring(table_prefix.length);
    }
    let result = tableName.substring(0, tableName.indexOf("_")) + tableName.substring(tableName.indexOf("_") + 1, tableName.indexOf("_") + 2).toUpperCase() + tableName.substring(tableName.indexOf("_") + 2);
    if (result.indexOf("_") > 0) {
        return getEntityName(result);
    } else {
        return result.substring(0, 1).toUpperCase() + result.substring(1);
    }
}

function filterBaseDomain(column): boolean {
    return !(column.Field === "id" || column.Field === "create_date" || column.Field === "update_date"|| column.Field === "creator" || column.Field === "updater");
}

function getTypeFromDB(dbType: string): string {
    if (dbType.indexOf("int") >= 0 || dbType.indexOf("float") >= 0) {
        return "number";
    } else if (dbType.indexOf("time") >= 0) {
        return "Date";
    } else {
        return "string";
    }
}