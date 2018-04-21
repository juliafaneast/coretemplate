"use strict";
var winston = require("winston");
var baseDB_1 = require("../db/baseDB");
var serviceFactoryImpl_1 = require("../service/impl/serviceFactoryImpl");
describe("authenticate test", function () {
    before(function () {
        global.config = require("../../config");
        winston.remove(winston.transports.Console);
        baseDB_1.initDB("MySQL");
    });
    describe("Basic login test(MySQL)", function () {
        it("should success login with right username password", function (done) {
            var factory = serviceFactoryImpl_1.serviceFactoryImpl.getInstance();
            factory.getAuthenticationService().login("enixjin", "111111").then(function (user) {
                if (user) {
                    done();
                }
                else {
                    done("login fail");
                }
            });
        });
    });
});
//# sourceMappingURL=authenticate.test.js.map