"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var chai_1 = require('chai');
var RESTEntity_1 = require("../domain/decorator/RESTEntity");
var baseDB_1 = require("../db/baseDB");
var baseDomainObject_1 = require("../domain/entity/baseDomainObject");
var testEntity = (function (_super) {
    __extends(testEntity, _super);
    function testEntity() {
        _super.apply(this, arguments);
    }
    testEntity = __decorate([
        RESTEntity_1.RESTEntity({
            table: "testTable",
            URL: "testURL",
            db: baseDB_1.dbType.centralized
        }), 
        __metadata('design:paramtypes', [])
    ], testEntity);
    return testEntity;
}(baseDomainObject_1.baseDomainObject));
describe("Decorator Test", function () {
    var entity = new testEntity();
    it("should update getTableName/getRESTUrl/getDBType", function () {
        chai_1.assert.equal(entity.getTableName(), "testTable");
        chai_1.assert.equal(entity.getRESTUrl(), "testURL");
        chai_1.assert.equal(entity.getDBType(), baseDB_1.dbType.centralized);
    });
});
//# sourceMappingURL=decorator.test.js.map