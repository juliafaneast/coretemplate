"use strict";
var baseDomainObject = (function () {
    function baseDomainObject() {
    }
    baseDomainObject.prototype.getTableName = function () {
        throw new Error('table name of this object is not defined!');
    };
    baseDomainObject.prototype.getRESTUrl = function () {
        throw new Error('REST URL of this object is not defined!');
    };
    baseDomainObject.prototype.getDBType = function () {
        throw new Error('dbType of this object is not defined!');
    };
    return baseDomainObject;
}());
exports.baseDomainObject = baseDomainObject;
