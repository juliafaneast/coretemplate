"use strict";
var Q = require("q");
var PAMAuthenticationService = (function () {
    function PAMAuthenticationService() {
    }
    PAMAuthenticationService.getInstance = function () {
        return PAMAuthenticationService._instance;
    };
    PAMAuthenticationService.prototype.login = function (username, password) {
        return Q.resolve(null);
    };
    PAMAuthenticationService._instance = new PAMAuthenticationService();
    return PAMAuthenticationService;
}());
exports.PAMAuthenticationService = PAMAuthenticationService;
//# sourceMappingURL=PAMAuthenticationService.js.map