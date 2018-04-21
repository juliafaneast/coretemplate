"use strict";
var Q = require("q");
//import * as pam from "authenticate-pam";
var PAMAuthenticationService = (function () {
    function PAMAuthenticationService() {
    }
    PAMAuthenticationService.getInstance = function () {
        return PAMAuthenticationService._instance;
    };
    PAMAuthenticationService.prototype.login = function (username, password) {
        /*
         pam.authenticate('username', 'password', function(err) {
         if(err) {
         return null;
         }
         else {
         winston.info("PAM Authenticated!");
         return new User(username);
         }
         });
         */
        return Q.resolve(null);
    };
    PAMAuthenticationService._instance = new PAMAuthenticationService();
    return PAMAuthenticationService;
}());
exports.PAMAuthenticationService = PAMAuthenticationService;
//# sourceMappingURL=PAMAuthenticationService.js.map