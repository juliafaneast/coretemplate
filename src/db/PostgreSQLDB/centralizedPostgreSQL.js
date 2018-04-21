"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var winston = require('winston');
var PostgreSQLDB_1 = require("./PostgreSQLDB");
var centralizedPostgreSQL = (function (_super) {
    __extends(centralizedPostgreSQL, _super);
    function centralizedPostgreSQL() {
        _super.call(this);
        winston.info('init centralizedPostgreSQL');
        if (centralizedPostgreSQL._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        centralizedPostgreSQL._instance = this;
    }
    centralizedPostgreSQL.getInstance = function () {
        return centralizedPostgreSQL._instance;
    };
    centralizedPostgreSQL.prototype.init = function () {
        var config = global.config;
        this.pool = this.createPool(config.centralizedDB, 'centralized');
    };
    centralizedPostgreSQL.prototype.getPool = function (param) {
        winston.debug("in database:[centralized]");
        return this.pool;
    };
    centralizedPostgreSQL._instance = new centralizedPostgreSQL();
    return centralizedPostgreSQL;
}(PostgreSQLDB_1.PostgreSQLDB));
exports.centralizedPostgreSQL = centralizedPostgreSQL;
