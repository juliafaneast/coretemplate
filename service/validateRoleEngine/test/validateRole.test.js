"use strict";
var chai_1 = require("chai");
var validateRoleEngineImpl_1 = require("../impl/validateRoleEngineImpl");
/**
 * Created by dannyzhu on 1/16/17.
 */
describe("router validate test", function () {
    it("approved", function () {
        chai_1.assert.equal(new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().validateRouter("employee", "/register"), true);
    });
});
describe("router validate test", function () {
    it("reject", function () {
        chai_1.assert.equal(new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().validateRouter("employee", "/deleteUser"), false);
    });
});
describe("remove permission", function () {
    it("approved", function () {
        new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().removePermission("employee", "/register");
        chai_1.assert.equal(new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().validateRouter("employee", "/register"), false);
    });
});
describe("add permission", function () {
    it("approved", function () {
        new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().removePermission("employee", "/update");
        chai_1.assert.equal(new validateRoleEngineImpl_1.validateRoleEngineImpl().getInstance().validateRouter("employee", "/update"), false);
    });
});
//# sourceMappingURL=validateRole.test.js.map