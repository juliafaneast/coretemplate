/**
 * Created by enixjin on 5/18/16.
 */
"use strict";
var rxjs_1 = require("@reactivex/rxjs");
var winston = require('winston');
var apiService = (function () {
    function apiService() {
        this.apiSteam = new rxjs_1.Subject();
        //TODO check why should winston be re initial here?
        try {
            winston.add(winston.transports.File, {
                filename: 'log/log.lo',
                json: false,
                maxsize: 400000,
                maxFiles: 10,
                level: 'debug'
            });
            winston.remove(winston.transports.Console);
            winston.add(winston.transports.Console, {
                prettyPrint: true,
                colorize: true,
                silent: false,
                timestamp: function () {
                    return new Date().toLocaleString();
                },
                level: 'debug'
            });
        }
        catch (e) {
            console.log("a winston init err?" + e);
        }
        winston.info("init api service");
        if (apiService._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        apiService._instance = this;
        this.apiSteam.subscribe(function (info) {
            winston.debug("creating api on URL:{" + info.method + "}     " + info.url);
        });
    }
    apiService.getInstance = function () {
        return apiService._instance;
    };
    apiService.prototype.push = function (info) {
        this.apiSteam.next(info);
    };
    apiService._instance = new apiService();
    return apiService;
}());
exports.apiService = apiService;
