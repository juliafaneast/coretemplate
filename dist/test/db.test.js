"use strict";
var chai_1 = require('chai');
var Q = require('q');
var centralizedMySQL_1 = require("../db/MySQL/centralizedMySQL");
var distributedMySQL_1 = require("../db/MySQL/distributedMySQL");
var centralizedPostgreSQL_1 = require("../db/PostgreSQLDB/centralizedPostgreSQL");
var baseDB_1 = require("../db/baseDB");
describe("DB test", function () {
    before(function () {
        global.config = require("../../config");
        baseDB_1.initDB("MySQL");
        baseDB_1.initDB("PostgreSQL");
    });
    describe("Basic db test(MySQL)", function () {
        it("should get correct centralized db pool", function (done) {
            var defer = Q.defer();
            centralizedMySQL_1.centralizedMySQL.getInstance().query("SELECT version()", [], defer, function (result) {
                done();
            });
        });
        it("should get correct distributed db pool", function (done) {
            var defer = Q.defer();
            distributedMySQL_1.distributedMySQL.getInstance().query("SELECT version()", [], defer, function (result) {
                done();
            }, "indicator");
        });
        it("should throw error while not give indicator for distributed db", function () {
            var defer = Q.defer();
            chai_1.expect(function () {
                distributedMySQL_1.distributedMySQL.getInstance().query("SELECT version()", [], defer, function (result) {
                });
            })
                .to.throw("A query to distributed db should always give indicator");
        });
    });
    describe("Basic db test(PostgreSQL)", function () {
        it.skip("should get correct centralized db pool", function (done) {
            var defer = Q.defer();
            centralizedPostgreSQL_1.centralizedPostgreSQL.getInstance().query("SELECT version()", [], defer, function (result) {
                done();
            });
        });
    });
});
//# sourceMappingURL=db.test.js.map