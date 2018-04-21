"use strict";
/**
 * Created by Enix on 3/14/2016.
 */
var express = require("express");
var jwt = require("jsonwebtoken");
var winston = require("winston");
var Q = require("q");
var serviceException_1 = require("../exception/serviceException");
var apiService_1 = require("../util/apiService");
var baseController = (function () {
    function baseController() {
        this.router = express.Router();
    }
    baseController.prototype.getRouter = function () {
        return this.router;
    };
    //authencation part
    baseController.prototype.checkAuthentication = function (req, res, next) {
        var _this = this;
        var auth = req.get('jwt');
        if (!auth) {
            winston.error('request without token, reject.');
            this.handleError(new serviceException_1.serviceException("ERR_nologin"), res);
        }
        else {
            var config = global.config;
            jwt.verify(auth, config.jwtSecKey, function (err, decoded) {
                if (err) {
                    winston.error(err.message);
                    _this.handleError(new serviceException_1.serviceException("ERR_relogin", err.message), res);
                }
                else {
                    winston.debug("user[" + JSON.stringify(decoded) + "] check token success");
                    next();
                }
            });
        }
    };
    baseController.prototype.getAuthentication = function (req) {
        var defer = Q.defer();
        var auth = req.get('jwt');
        if (!auth) {
            defer.reject(new serviceException_1.serviceException("ERR_relogin"));
        }
        else {
            var config = global.config;
            jwt.verify(auth, config.jwtSecKey, function (err, decoded) {
                if (err) {
                    defer.reject(new serviceException_1.serviceException("ERR_relogin"));
                }
                else {
                    winston.debug("user from token:[" + JSON.stringify(decoded) + "]");
                    defer.resolve(decoded);
                }
            });
        }
        return defer.promise;
    };
    baseController.prototype.getAuthenticationSync = function (req) {
        try {
            var auth = req.get('jwt');
            var config = global.config;
            var decoded = jwt.verify(auth, config.jwtSecKey);
            return decoded;
        }
        catch (err) {
            return null;
        }
    };
    //common get post del put etc.
    baseController.prototype.get = function (url, callback, withAuth) {
        if (withAuth === void 0) { withAuth = true; }
        apiService_1.apiService.getInstance().push({ method: 'get', url: url });
        if (withAuth) {
            this.router.get(url, this.checkAuthentication.bind(this), callback);
        }
        else {
            this.router.get(url, callback);
        }
    };
    baseController.prototype.post = function (url, callback, withAuth) {
        if (withAuth === void 0) { withAuth = true; }
        apiService_1.apiService.getInstance().push({ method: 'post', url: url });
        if (withAuth) {
            this.router.post(url, this.checkAuthentication.bind(this), callback);
        }
        else {
            this.router.post(url, callback);
        }
    };
    baseController.prototype.put = function (url, callback) {
        apiService_1.apiService.getInstance().push({ method: 'put', url: url });
        this.router.put(url, this.checkAuthentication.bind(this), callback);
    };
    baseController.prototype.delete = function (url, callback) {
        apiService_1.apiService.getInstance().push({ method: 'delete', url: url });
        this.router.delete(url, this.checkAuthentication.bind(this), callback);
    };
    //utils
    baseController.prototype.handleError = function (error, res, req) {
        try {
            res.status(error.statusCode).jsonp(error);
            winston.error("server error:" + JSON.stringify(error));
        }
        catch (e) {
            winston.error("unknown server error:" + error.stack);
            res.status(500).jsonp({
                "errCode": "ERR_500",
                "message": "Server error",
                "statusCode": 500,
                "error": "unknown Server error"
            });
        }
    };
    return baseController;
}());
exports.baseController = baseController;
