"use strict";
var exportMetadataKey = Symbol("exportMetadataKey");
var subQueryMetadataKey = Symbol("subQueryMetadataKey");
require("reflect-metadata");
function RESTEntity(option) {
    return function decorator(target) {
        target.prototype.getTableName = function () { return option.table; };
        target.prototype.getRESTUrl = function () { return option.URL; };
        target.prototype.getDBType = function () { return option.db; };
    };
}
exports.RESTEntity = RESTEntity;
function exportable(value) {
    return Reflect.metadata(exportMetadataKey, value);
}
exports.exportable = exportable;
function getExportable(target, propertyKey) {
    return Reflect.getMetadata(exportMetadataKey, target, propertyKey);
}
exports.getExportable = getExportable;
function subQuery(value) {
    return Reflect.metadata(subQueryMetadataKey, value);
}
exports.subQuery = subQuery;
function getSubQuery(target, propertyKey) {
    return Reflect.getMetadata(subQueryMetadataKey, target, propertyKey);
}
exports.getSubQuery = getSubQuery;
//# sourceMappingURL=RESTEntity.js.map