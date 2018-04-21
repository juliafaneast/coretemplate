"use strict";
var pg = require("pg");
var winston = require("winston");
var serviceException_1 = require("../../exception/serviceException");
var PostgreSQLDB = (function () {
    function PostgreSQLDB() {
    }
    PostgreSQLDB.prototype.createPool = function (cfg, name) {
        var pool = new pg.Pool({
            max: cfg.connectionLimit,
            host: cfg.host,
            database: cfg.database,
            user: cfg.user,
            password: cfg.password
        });
        winston.debug("PostgreSQL database(" + name + ") at:" + cfg.host + " pool created.");
        return pool;
    };
    PostgreSQLDB.prototype.query = function (sql, param, defer, callback, meid) {
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
    return PostgreSQLDB;
}());
exports.PostgreSQLDB = PostgreSQLDB;
//# sourceMappingURL=PostgreSQLDB.js.map