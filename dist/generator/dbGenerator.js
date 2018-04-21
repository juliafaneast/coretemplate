"use strict";
global.config = require("../../config");
var table_prefix = "";
var baseDB_1 = require("../db/baseDB");
var centralizedMySQL_1 = require("../db/MySQL/centralizedMySQL");
var Q = require('q');
baseDB_1.initDB("MySQL");
var defer = Q.defer();
var total = 100;
var count = 0;
var path = process.argv[2];
var fs = require("fs");
centralizedMySQL_1.centralizedMySQL.getInstance().query("show tables", null, defer, function (tables) {
    var config = global.config;
    total = tables.length * 4;
    createDocFile();
    tables.forEach(function (table, index) {
        var ad = Q.defer();
        centralizedMySQL_1.centralizedMySQL.getInstance().query("show columns in " + table["Tables_in_" + config.centralizedDB.database], null, ad, function (columns) {
            console.log("----generating object for table " + table["Tables_in_" + config.centralizedDB.database]);
            generateEntity(table["Tables_in_" + config.centralizedDB.database], columns);
            generateRepository(table["Tables_in_" + config.centralizedDB.database]);
            generateController(table["Tables_in_" + config.centralizedDB.database]);
            generateControllerDoc(table["Tables_in_" + config.centralizedDB.database], columns);
        });
    });
});
function createDocFile() {
    fs.mkdirSync(path + "controller");
    fs.mkdirSync(path + "repository");
    fs.mkdirSync(path + "entity");
    fs.mkdirSync(path + "controller/doc");
    var docfile = fs.openSync(path + "controller/doc/apidoc.js", "w");
    fs.writeSync(docfile, "/**\n * @apiDefine authorized\n * @apiHeader {String} jwt \u7528\u6237\u767B\u5F55token.\n * @apiError Unauthorized \u7528\u6237\u6CA1\u6709\u767B\u5F55.\n *\n * @apiErrorExample Error-Response:\n *     HTTP/1.1 401 Unauthorized\n *     {\n *       \"message\": \"message contents\"\n *     }\n */\n\n/**\n * @api {post} /users/login login\n * @apiVersion 0.0.1\n * @apiName /users/login\n * @apiGroup User\n * @apiDescription \u7528\u6237\u767B\u5F55\n * @apiParam {String} username \u7528\u6237\u540D.\n * @apiParam {String} password \u5BC6\u7801.\n * @apiSuccess {String} token  \u7528\u6237Token.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     {\n *          \"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVuaXgiLCJpYXQiOjE0NTc5Mzk0MjcsImV4cCI6MTQ1NzkzOTcyN30._TISwwnvlGUZwCLW5Wf75cNHZ7lEH3P_-8lfFqp1pcI\"\n *     }\n * @apiError BadRequest \u767B\u5F55\u4FE1\u606F\u683C\u5F0F\u6216\u5185\u5BB9\u9519\u8BEF\n * @apiErrorExample {json} Error-Response:\n *     Error 400: Bad Request\n *      {\n *          \"message\": \"bad request\"\n *      }\n */\n \n /**\n * @api {post} /users/register register\n * @apiVersion 0.0.1\n * @apiName /users/register\n * @apiGroup User\n * @apiDescription \u521B\u5EFA\u7528\u6237\n * @apiParam {String} username \u7528\u6237\u540D.\n * @apiParam {String} password \u5BC6\u7801.\n * @apiSuccess {String} token  \u7528\u6237Token.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     {\n *          \"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVuaXgiLCJpYXQiOjE0NTc5Mzk0MjcsImV4cCI6MTQ1NzkzOTcyN30._TISwwnvlGUZwCLW5Wf75cNHZ7lEH3P_-8lfFqp1pcI\"\n *     }\n * @apiError BadRequest \u521B\u5EFA\u683C\u5F0F\u6216\u5185\u5BB9\u9519\u8BEF\n * @apiErrorExample {json} Error-Response:\n *     Error 400: Bad Request\n *      {\n *          \"message\": \"bad request\"\n *      }\n */\n\n");
}
function generateControllerDoc(tableName, columns) {
    var entityName = getEntityName(tableName);
    var docfile = fs.openSync(path + "controller/doc/apidoc.js", "a");
    fs.appendFileSync(docfile, ("\n        \n/**\n * @api {post} /" + getLowerFirst(entityName) + "s create" + entityName + "\n * @apiVersion 0.0.1\n * @apiName create" + entityName + "\n * @apiGroup " + entityName + "\n * @apiDescription create " + entityName + "\n *\n") + getDocColumns(columns) + ("\n *\n * @apiSuccess {Number} id  " + entityName + " id.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     {\n *       id:1\n *     }\n * @apiUse authorized\n */\n \n /**\n * @api {get} /" + getLowerFirst(entityName) + "s get" + entityName + "List\n * @apiVersion 0.0.1\n * @apiName get" + entityName + "List\n * @apiGroup " + entityName + "\n * @apiDescription get " + entityName + " list\n *\n * @apiSuccess {Number} id  " + entityName + " id.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     [\n *        ... \n *     ]\n * @apiUse authorized\n */\n \n /**\n * @api {get} /" + getLowerFirst(entityName) + "s/:id get" + entityName + "ByID\n * @apiVersion 0.0.1\n * @apiName get" + entityName + "ByID\n * @apiGroup " + entityName + "\n * @apiDescription get " + entityName + " by id.\n *\n * @apiSuccess {Number} id  " + entityName + " id.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     [\n *        ... \n *     ]\n * @apiUse authorized\n */\n \n /**\n * @api {put} /" + getLowerFirst(entityName) + "s/:id update" + entityName + "\n * @apiVersion 0.0.1\n * @apiName update" + entityName + "\n * @apiGroup " + entityName + "\n * @apiDescription update " + entityName + " info.\n *\n * @apiParam {Number} id " + entityName + " unique ID.\n") + getDocColumns(columns) + ("\n *\n * @apiSuccess {Number} affectedRows  rows updated.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     {\n *       \"affectedRows\": 1\n *     }\n * @apiUse authorized\n */\n \n  /**\n * @api {delete} /" + getLowerFirst(entityName) + "s/:id delete" + entityName + "\n * @apiVersion 0.0.1\n * @apiName delete" + entityName + "\n * @apiGroup " + entityName + "\n * @apiDescription delete " + entityName + " by id.\n *\n * @apiParam {Number} id " + entityName + " unique ID.\n *\n * @apiSuccess {Number} affectedRows  rows updated.\n *\n * @apiSuccessExample Success-Response:\n *     HTTP/1.1 200 OK\n *     {\n *       \"affectedRows\": 1\n *     }\n * @apiUse authorized\n */\n\n"));
    count++;
    if (count == total) {
        console.log("done");
        process.exit();
    }
}
function generateController(tableName) {
    var entityName = getEntityName(tableName);
    var lowCaseName = getLowerFirst(entityName);
    var fileName = lowCaseName + "Controller.ts";
    fs.open(path + "controller/" + fileName, "w", function (err, fd) {
        fs.writeSync(fd, "import {baseCRUDController} from \"core\";\nimport {" + lowCaseName + "Repository} from \"../repository/" + lowCaseName + "Repository\";\nimport {" + entityName + "} from \"../entity/" + entityName + "\";\n\nexport class " + lowCaseName + "Controller extends baseCRUDController<" + entityName + ", " + lowCaseName + "Repository> {\n\n    constructor() {\n        super(" + entityName + ", " + lowCaseName + "Repository);\n    }\n\n    initRouters() {\n        let domainObject = new this._domainObject();\n\n    }\n\n}");
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}
function generateRepository(tableName) {
    var entityName = getEntityName(tableName);
    var lowCaseName = getLowerFirst(entityName);
    var fileName = lowCaseName + "Repository.ts";
    fs.open(path + "repository/" + fileName, "w", function (err, fd) {
        fs.writeSync(fd, "import {" + entityName + "} from \"../entity/" + entityName + "\";\nimport * as winston from \"winston\";\nimport {baseRepository} from \"core\";\n\nexport class " + lowCaseName + "Repository extends baseRepository<" + entityName + "> {\n    private static _instance: " + lowCaseName + "Repository = new " + lowCaseName + "Repository();\n\n    constructor() {\n        super(" + entityName + ");\n        winston.info(\"init " + lowCaseName + "Repository\");\n        if (" + lowCaseName + "Repository._instance) {\n            throw new Error(\"Error: Instantiation failed: Use getInstance() instead of new.\");\n        }\n        " + lowCaseName + "Repository._instance = this;\n    }\n\n    public static getInstance(): " + lowCaseName + "Repository {\n        return " + lowCaseName + "Repository._instance;\n    }\n\n}");
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}
function generateEntity(tableName, columns) {
    var entityName = getEntityName(tableName);
    var fileName = entityName + ".ts";
    fs.open(path + "entity/" + fileName, "w", function (err, fd) {
        fs.writeSync(fd, "\nimport {baseDomainObject} from \"core\";\nimport {dbType} from \"core\";\nimport {RESTEntity, exportable, subQuery} from \"core\";\n\n@RESTEntity(\n    {\n        table: \"" + tableName + "\",\n        URL: \"/" + getLowerFirst(entityName) + "s\",\n        db: dbType.centralized\n    })\nexport class " + entityName + " extends baseDomainObject {\n");
        columns.filter(filterBaseDomain).forEach(function (column) {
            fs.writeSync(fd, "\n        " + column.Field + ":" + getTypeFromDB(column.Type) + ";");
        });
        fs.writeSync(fd, "\n        \n}\n");
        count++;
        if (count == total) {
            console.log("done");
            process.exit();
        }
    });
}
function getDocColumns(columns) {
    var result = "";
    columns.filter(filterBaseDomain).forEach(function (column) {
        result += " * @apiParam {" + getTypeFromDB(column.Type) + "} [" + column.Field + "] " + column.Field + ".\n";
    });
    return result;
}
function getLowerFirst(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}
function getEntityName(tableName) {
    if (table_prefix) {
        tableName = tableName.substring(table_prefix.length);
    }
    var result = tableName.substring(0, tableName.indexOf("_")) + tableName.substring(tableName.indexOf("_") + 1, tableName.indexOf("_") + 2).toUpperCase() + tableName.substring(tableName.indexOf("_") + 2);
    if (result.indexOf("_") > 0) {
        return getEntityName(result);
    }
    else {
        return result.substring(0, 1).toUpperCase() + result.substring(1);
    }
}
function filterBaseDomain(column) {
    return !(column.Field === "id" || column.Field === "create_date" || column.Field === "update_date" || column.Field === "creator" || column.Field === "updater");
}
function getTypeFromDB(dbType) {
    if (dbType.indexOf("int") >= 0 || dbType.indexOf("float") >= 0) {
        return "number";
    }
    else if (dbType.indexOf("time") >= 0) {
        return "Date";
    }
    else {
        return "string";
    }
}
//# sourceMappingURL=dbGenerator.js.map