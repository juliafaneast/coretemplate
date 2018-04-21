"use strict";
var MySqlAuthenticationService = (function () {
    function MySqlAuthenticationService() {
    }
    MySqlAuthenticationService.getInstance = function () {
        return MySqlAuthenticationService._instance;
    };
    MySqlAuthenticationService.prototype.login = function (username, password, userRepository) {
        return userRepository.login(username, password);
    };
    MySqlAuthenticationService._instance = new MySqlAuthenticationService();
    return MySqlAuthenticationService;
}());
exports.MySqlAuthenticationService = MySqlAuthenticationService;
//# sourceMappingURL=MySqlAuthenticationService.js.map