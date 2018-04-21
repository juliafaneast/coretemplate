"use strict";
var centralizedMySQL_1 = require("./MySQL/centralizedMySQL");
var distributedMySQL_1 = require("./MySQL/distributedMySQL");
var centralizedPostgreSQL_1 = require("./PostgreSQLDB/centralizedPostgreSQL");
function initDB(type) {
    switch (type) {
        case "MySQL":
            centralizedMySQL_1.centralizedMySQL.getInstance().init();
            distributedMySQL_1.distributedMySQL.getInstance().init();
        case "PostgreSQL":
            centralizedPostgreSQL_1.centralizedPostgreSQL.getInstance().init();
    }
}
exports.initDB = initDB;
(function (dbType) {
    dbType[dbType["distributed"] = 0] = "distributed";
    dbType[dbType["centralized"] = 1] = "centralized";
})(exports.dbType || (exports.dbType = {}));
var dbType = exports.dbType;
//# sourceMappingURL=baseDB.js.map