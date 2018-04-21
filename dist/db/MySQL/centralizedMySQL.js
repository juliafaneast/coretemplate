"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var winston = require('winston');
var MySQLDB_1 = require("./MySQLDB");
var centralizedMySQL = (function (_super) {
    __extends(centralizedMySQL, _super);
    function centralizedMySQL() {
        _super.call(this);
        winston.info('init centralizedMySQL');
        if (centralizedMySQL._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        centralizedMySQL._instance = this;
    }
    centralizedMySQL.getInstance = function () {
        return centralizedMySQL._instance;
    };
    centralizedMySQL.prototype.init = function () {
        var config = global.config;
        this.pool = this.createPool(config.centralizedDB, 'centralized');
    };
    centralizedMySQL.prototype.getPool = function (param) {
        winston.debug("in database:[centralized]");
        return this.pool;
    };
    centralizedMySQL._instance = new centralizedMySQL();
    return centralizedMySQL;
}(MySQLDB_1.MySQLDB));
exports.centralizedMySQL = centralizedMySQL;
//# sourceMappingURL=centralizedMySQL.js.map