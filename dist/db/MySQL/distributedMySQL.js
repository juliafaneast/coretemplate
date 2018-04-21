"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var winston = require("winston");
var tools_1 = require("../../util/tools");
var MySQLDB_1 = require("./MySQLDB");
var distributedMySQL = (function (_super) {
    __extends(distributedMySQL, _super);
    function distributedMySQL() {
        _super.call(this);
        this.pools = [];
        winston.info('init distributedMySQL');
        if (distributedMySQL._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        distributedMySQL._instance = this;
    }
    distributedMySQL.getInstance = function () {
        return distributedMySQL._instance;
    };
    distributedMySQL.prototype.init = function () {
        var _this = this;
        var config = global.config;
        config.distributedDBs.map(function (cfg) {
            _this.pools.push(_this.createPool(cfg, 'distributed'));
        });
    };
    distributedMySQL.prototype.getPool = function (indicator) {
        if (this.pools.length === 1) {
            return this.pools[0];
        }
        if (!indicator) {
            winston.error("Implementation Error: A query to distributed db should always give indicator");
            throw new Error("A query to distributed db should always give indicator");
        }
        return this.getDBByIndicator(indicator);
    };
    distributedMySQL.prototype.getDBByIndicator = function (indicator) {
        var dbHash = tools_1.tools.getHash(indicator);
        winston.debug("in database:[distributed][" + dbHash + "]");
        return this.pools[dbHash];
    };
    distributedMySQL._instance = new distributedMySQL();
    return distributedMySQL;
}(MySQLDB_1.MySQLDB));
exports.distributedMySQL = distributedMySQL;
//# sourceMappingURL=distributedMySQL.js.map