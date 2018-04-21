"use strict";
var mysql = require("mysql");
var winston = require("winston");
var serviceException_1 = require("../../exception/serviceException");
var MySQLDB = (function () {
    function MySQLDB() {
    }
    MySQLDB.prototype.createPool = function (cfg, name) {
        var pool = mysql.createPool({
            connectionLimit: cfg.connectionLimit,
            host: cfg.host,
            database: cfg.database,
            user: cfg.user,
            password: cfg.password,
            dateStrings: true
        });
        winston.debug("MySQL database pool(" + name + ") at:" + cfg.host + " created.");
        return pool;
    };
    MySQLDB.prototype.query = function (sql, param, defer, callback, meid) {
        winston.debug('execute sql:' + sql);
        winston.debug('with param:' + JSON.stringify(param));
        this.getPool(meid).query(sql, param, function (err, rows) {
            if (err) {
                winston.error("while execute SQL: " + sql);
                winston.error("with params: " + JSON.stringify(param));
                winston.error(err.toString());
                defer.reject(new serviceException_1.serviceException("ERR_DB", err.toString()));
            }
            else {
                if (callback) {
                    callback(rows);
                }
            }
        });
    };
    return MySQLDB;
}());
exports.MySQLDB = MySQLDB;
//# sourceMappingURL=MySQLDB.js.map