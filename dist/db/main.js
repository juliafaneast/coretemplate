"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var baseDB_1 = require("./baseDB");
exports.dbType = baseDB_1.dbType;
exports.initDB = baseDB_1.initDB;
__export(require("./MySQL/main"));
__export(require("./PostgreSQLDB/main"));
//# sourceMappingURL=main.js.map