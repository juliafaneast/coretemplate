"use strict";
/**
 * Created by dannyzhu on 1/16/17.
 */
var cacheServiceImpl_1 = require("../cache/impl/cacheServiceImpl");
var chai_1 = require("chai");
new cacheServiceImpl_1.cacheServiceImpl().getInstance().put("danny", "1234");
new cacheServiceImpl_1.cacheServiceImpl().getInstance().put("1234", ["Admin", "Employee"]);
describe("cache test", function () {
    it("return the role", function () {
        chai_1.assert.equal(new cacheServiceImpl_1.cacheServiceImpl().getInstance().get("1234")[1], "Employee");
    });
});
//# sourceMappingURL=cache.test.js.map