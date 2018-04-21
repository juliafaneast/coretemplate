"use strict";
var Q = require("q");
var baseDB_1 = require("../../db/baseDB");
var RESTEntity_1 = require("../decorator/RESTEntity");
var centralizedMySQL_1 = require("../../db/MySQL/centralizedMySQL");
var distributedMySQL_1 = require("../../db/MySQL/distributedMySQL");
var baseRepository = (function () {
    function baseRepository(_domainObject) {
        this._domainObject = _domainObject;
        this.centralizedDB = centralizedMySQL_1.centralizedMySQL.getInstance();
        this.distributedDB = distributedMySQL_1.distributedMySQL.getInstance();
        this.domainObject = new this._domainObject();
    }
    baseRepository.prototype.getDomainObject = function () {
        return this.domainObject;
    };
    baseRepository.prototype.insert = function (objectToInsert, indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("insert into " + this.domainObject.getTableName() + " set ?", objectToInsert, defer, function (rows) {
            defer.resolve(rows.insertId);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.batchInsert = function (objectsToInsert, indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        var keys = Object.keys(objectsToInsert[0]);
        var data = [];
        objectsToInsert.forEach(function (domainObject) {
            var values = [];
            keys.map((function (key) {
                values.push(domainObject[key]);
            }));
            data.push(values);
        });
        db.query("insert into " + this.domainObject.getTableName() + " (" + keys.join() + ") values ?", [data], defer, function (rows) {
            defer.resolve(rows.affectedRows);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.queryByID = function (id, postProcess, indicator) {
        var _this = this;
        if (postProcess === void 0) { postProcess = true; }
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("select * from " + this.domainObject.getTableName() + " where id=?", [id], defer, function (rows) {
            if (rows.length !== 1) {
                defer.resolve(null);
            }
            else {
                if (postProcess) {
                    _this.postProcess(rows[0]).then(defer.resolve);
                }
                else {
                    defer.resolve(rows[0]);
                }
            }
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.listAll = function (postProcess, indicator) {
        var _this = this;
        if (postProcess === void 0) { postProcess = true; }
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("select * from " + this.domainObject.getTableName() + " order by id desc ", [], defer, function (rows) {
            if (postProcess) {
                Q.all(rows.map(_this.postProcess.bind(_this))).then(function (values) {
                    defer.resolve(rows);
                });
            }
            else {
                defer.resolve(rows);
            }
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.update = function (objectToUpdate, id, indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("update " + this.domainObject.getTableName() + " set ? where id=?", [this.removeID(objectToUpdate), id], defer, function (result) {
            defer.resolve(result.affectedRows);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.updateAndRefresh = function (objectToUpdate, id, indicator) {
        var _this = this;
        return this.update(objectToUpdate, id, indicator).then(function () {
            return _this.queryByID(id, true, indicator);
        });
    };
    baseRepository.prototype.delete = function (id, indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("delete from " + this.domainObject.getTableName() + " where id=?", [id], defer, function (result) {
            defer.resolve(result.affectedRows);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.batchDelete = function (query, indicator) {
        var _this = this;
        var defer = Q.defer();
        var where = " ";
        var first = true;
        var arg = [];
        Object.keys(query).forEach(function (key) {
            if (first) {
                where += " where " + key + _this.getConditionKey(query[key]);
                first = false;
            }
            else {
                where += " and " + key + _this.getConditionKey(query[key]);
            }
            Array.prototype.push.apply(arg, _this.getConditionArg(query[key]));
        });
        var db = this.getDB(this.domainObject.getDBType());
        db.query("delete from " + this.domainObject.getTableName() + where, arg, defer, function (result) {
            defer.resolve(result.affectedRows);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.search = function (query, indicator) {
        var _this = this;
        var defer = Q.defer();
        var where = " ";
        var first = true;
        var arg = [];
        Object.keys(query).forEach(function (key) {
            if (first) {
                where += " where " + key + _this.getConditionKey(query[key]);
                first = false;
            }
            else {
                where += " and " + key + _this.getConditionKey(query[key]);
            }
            Array.prototype.push.apply(arg, _this.getConditionArg(query[key]));
        });
        var db = this.getDB(this.domainObject.getDBType());
        db.query("select * from " + this.domainObject.getTableName() + where + " order by id desc ", arg, defer, function (rows) {
            Q.all(rows.map(_this.postProcess.bind(_this))).then(function () {
                defer.resolve(rows);
            });
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.searchLike = function (query, indicator) {
        var _this = this;
        var defer = Q.defer();
        var where = " ";
        var first = true;
        var arg = [];
        Object.keys(query).forEach(function (key) {
            if (first) {
                where += " where " + key + " like ? ";
                first = false;
            }
            else {
                where += " and " + key + " like ? ";
            }
            arg.push('%' + query[key] + '%');
        });
        var db = this.getDB(this.domainObject.getDBType());
        db.query("select * from " + this.domainObject.getTableName() + where + " order by id desc ", arg, defer, function (rows) {
            Q.all(rows.map(_this.postProcess.bind(_this))).then(function () {
                defer.resolve(rows);
            });
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.count = function (indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        db.query("select count(1) as count from " + this.domainObject.getTableName(), [], defer, function (result) {
            defer.resolve(result[0]);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.countAllLike = function (paginationRequest, indicator) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        var arg = [];
        var where = "";
        if (paginationRequest.searchAllColumn && paginationRequest.searchAllColumn.trim().length > 0) {
            where = " where (";
            var first = true;
            for (var _i = 0, _a = paginationRequest.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                if (first) {
                    first = false;
                    where += column.name + " like ?";
                }
                else {
                    where += " or " + column.name + " like ?";
                }
                arg.push("%" + paginationRequest.searchAllColumn + "%");
            }
            where += ") ";
        }
        db.query("select count(1) as count from " + this.domainObject.getTableName() + where, arg, defer, function (result) {
            defer.resolve(result[0]);
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.queryAllLike = function (paginationRequest, indicator) {
        var _this = this;
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        var arg = [];
        var where = "";
        if (paginationRequest.searchAllColumn && paginationRequest.searchAllColumn.trim().length > 0) {
            where = " where (";
            var first = true;
            for (var _i = 0, _a = paginationRequest.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                if (first) {
                    first = false;
                    where += column.name + " like ?";
                }
                else {
                    where += " or " + column.name + " like ?";
                }
                arg.push("%" + paginationRequest.searchAllColumn + "%");
            }
            where += ") ";
        }
        arg.push(paginationRequest.start);
        arg.push(paginationRequest.length);
        db.query("select * from " + this.domainObject.getTableName() + where + " order by id desc " + " limit ?,?", arg, defer, function (rows) {
            Q.all(rows.map(_this.postProcess.bind(_this))).then(function () {
                defer.resolve(rows);
            });
        }, indicator);
        return defer.promise;
    };
    baseRepository.prototype.queryByCreateDate = function (startDate, endDate) {
        var defer = Q.defer();
        var pool = this.getDB(this.domainObject.getDBType());
        pool.query("select * from " + this.domainObject.getTableName() + " where create_date between ? and ?" + " order by id desc ", [startDate, endDate], defer, function (rows) {
            defer.resolve(rows);
        });
        return defer.promise;
    };
    baseRepository.prototype.getDB = function (type) {
        if (type === baseDB_1.dbType.distributed) {
            return this.distributedDB;
        }
        else if (type === baseDB_1.dbType.centralized) {
            return this.centralizedDB;
        }
    };
    baseRepository.prototype.removeID = function (objectToUpdate) {
        if (objectToUpdate.id) {
            delete objectToUpdate.id;
        }
        return objectToUpdate;
    };
    baseRepository.prototype.postProcess = function (domain) {
        return Q.all([this.removeNotExportable(domain), this.doSubQuery(domain)]).then(function () { return domain; });
    };
    baseRepository.prototype.doSubQuery = function (domain) {
        var defer = Q.defer();
        var subQuerys = [];
        var _loop_1 = function(key) {
            if (RESTEntity_1.getSubQuery(this_1.domainObject, key)) {
                var handler_1 = RESTEntity_1.getSubQuery(this_1.domainObject, key);
                if (domain[key]) {
                    subQuerys.push(handler_1.repository.getInstance().queryByID(domain[key]).then(function (subObject) {
                        domain[handler_1.name] = subObject;
                        return domain;
                    }));
                }
            }
        };
        var this_1 = this;
        for (var key in domain) {
            _loop_1(key);
        }
        Q.all(subQuerys).then(function () { return defer.resolve(domain); });
        return defer.promise;
    };
    baseRepository.prototype.removeNotExportable = function (domain) {
        var defer = Q.defer();
        for (var key in domain) {
            if (RESTEntity_1.getExportable(this.domainObject, key) === false) {
                delete domain[key];
            }
        }
        defer.resolve(domain);
        return defer.promise;
    };
    baseRepository.prototype.getFields = function (objectToInsert) {
        var result = [];
        Object.getOwnPropertyNames(objectToInsert)
            .forEach(function (field) {
            result.push(field);
        });
        return result;
    };
    baseRepository.prototype.getConditionKey = function (query) {
        if (query.toString().indexOf('{') >= 0) {
            var result_1 = " in (";
            var first_1 = true;
            query.substring(query.indexOf('{') + 1, query.length - 1).split(",").forEach(function () {
                if (first_1) {
                    result_1 += "?";
                    first_1 = false;
                }
                else {
                    result_1 += ",?";
                }
            });
            return result_1 + ") ";
        }
        else {
            return "=? ";
        }
    };
    baseRepository.prototype.getConditionArg = function (query) {
        if (query.toString().indexOf('{') == 0) {
            var q = query.substring(query.indexOf('{') + 1, query.length - 1);
            return q.split(",");
        }
        else {
            return [query];
        }
    };
    return baseRepository;
}());
exports.baseRepository = baseRepository;
//# sourceMappingURL=baseRepository.js.map