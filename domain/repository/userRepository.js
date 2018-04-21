"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by enixjin on 12/13/16.
 */
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken");
var winston = require("winston");
var Q = require("q");
var baseRepository_1 = require("./baseRepository");
var encryption_1 = require("../../util/encryption");
var userRepository = (function (_super) {
    __extends(userRepository, _super);
    function userRepository() {
        _super.call(this, User_1.User);
        winston.info("init userRepository");
        // console.log('init dataServerDB');
        if (userRepository._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        userRepository._instance = this;
    }
    userRepository.getInstance = function () {
        return userRepository._instance;
    };
    userRepository.prototype.update = function (user, id) {
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
    userRepository.prototype.login = function (username, password) {
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
    userRepository.prototype.changeNewPassword = function (newpassword, userid) {
        var defer = Q.defer();
        var pool = this.getDB(this.domainObject.getDBType());
        var psw = encryption_1.encryption.encryptMd5(newpassword);
        pool.query("update " + this.domainObject.getTableName() + " set password=? where id=?", [psw, userid], defer, function (result) {
            defer.resolve(result.affectedRows);
        });
        return defer.promise;
    };
    userRepository.prototype.generateJWT = function (user) {
        winston.debug("generate token for user[id:" + user.id + ",username:" + user.username + "]");
        var config = global.config;
        return jwt.sign({ id: user.id, username: user.username }, config.jwtSecKey, { expiresIn: config.jwtTimeout });
    };
    userRepository._instance = new userRepository();
    return userRepository;
}(baseRepository_1.baseRepository));
exports.userRepository = userRepository;
//# sourceMappingURL=userRepository.js.map