"use strict";
var userRepository_1 = require("../../../domain/repository/userRepository");
var MySqlAuthenticationService = (function () {
    function MySqlAuthenticationService() {
    }
    MySqlAuthenticationService.getInstance = function () {
        return MySqlAuthenticationService._instance;
    };
    MySqlAuthenticationService.prototype.login = function (username, password) {
        return userRepository_1.userRepository.getInstance().login(username, password);
    };
    MySqlAuthenticationService._instance = new MySqlAuthenticationService();
    return MySqlAuthenticationService;
}());
exports.MySqlAuthenticationService = MySqlAuthenticationService;
//# sourceMappingURL=MySqlAuthenticationService.js.map