"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by enixjin on 12/13/16.
 */
var jwt = require("jsonwebtoken");
var winston = require("winston");
var Q = require("q");
var baseRepository_1 = require("./baseRepository");
var encryption_1 = require("../../util/encryption");
var baseUserRepository = (function (_super) {
    __extends(baseUserRepository, _super);
    function baseUserRepository() {
        _super.apply(this, arguments);
    }
    baseUserRepository.prototype.update = function (user, id) {
        var defer = Q.defer();
        var db = this.getDB(this.domainObject.getDBType());
        if (user.password) {
            user.password = encryption_1.encryption.encryptMd5(user.password);
        }
        db.query("update " + this.domainObject.getTableName() + " set ? where id=?", [this.removeID(user), id], defer, function (result) {
            defer.resolve(result.affectedRows);
        });
        return defer.promise;
    };
    baseUserRepository.prototype.login = function (username, password) {
        var _this = this;
        var encryptedPassword = encryption_1.encryption.encryptMd5(password);
        var defer = Q.defer();
        var pool = this.getDB(this.domainObject.getDBType());
        pool.query("select * from " + this.domainObject.getTableName() + " where username=? and password=?", [username, encryptedPassword], defer, function (result) {
            if (result.length !== 1) {
                defer.resolve(null);
            }
            else {
                _this.postProcess(result[0]).then(function (user) {
                    defer.resolve({ id: user.id, token: _this.generateJWT(user), detail: user });
                });
            }
        });
        return defer.promise;
    };
    baseUserRepository.prototype.changeNewPassword = function (newpassword, userid) {
        var defer = Q.defer();
        var pool = this.getDB(this.domainObject.getDBType());
        var psw = encryption_1.encryption.encryptMd5(newpassword);
        pool.query("update " + this.domainObject.getTableName() + " set password=? where id=?", [psw, userid], defer, function (result) {
            defer.resolve(result.affectedRows);
        });
        return defer.promise;
    };
    baseUserRepository.prototype.generateJWT = function (user) {
        winston.debug("generate token for user[id:" + user.id + ",username:" + user.username + ",role:" + user.role + "]");
        var config = global.config;
        return jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, config.jwtSecKey, { expiresIn: config.jwtTimeout });
    };
    return baseUserRepository;
}(baseRepository_1.baseRepository));
exports.baseUserRepository = baseUserRepository;
