"use strict";
var serviceException = (function () {
    function serviceException(_errCode, _error, errorMessage) {
        this.errCode = _errCode;
        var exceptionConfig = this.getMsgByCode(_errCode);
        this.message = exceptionConfig.message;
        this.statusCode = exceptionConfig.statusCode;
        if (_error) {
            this.error = _error.toString();
        }
        if (errorMessage) {
            this.message = errorMessage;
        }
    }
    serviceException.prototype.getMsgByCode = function (code) {
        var message = new exceptionConfig("Unknown Error", 500);
        if (messageConfig[code]) {
            message = messageConfig[code];
        }
        return message;
    };
    return serviceException;
}());
exports.serviceException = serviceException;
var exceptionConfig = (function () {
    function exceptionConfig(_message, _statusCode) {
        if (_statusCode === void 0) { _statusCode = 500; }
        this.message = _message;
        this.statusCode = _statusCode;
    }
    return exceptionConfig;
}());
exports.exceptionConfig = exceptionConfig;
var messageConfig = {
    ERR_404: new exceptionConfig("Request not found!", 404),
    ERR_500: new exceptionConfig("Server Error!", 500),
    ERR_nologin: new exceptionConfig("Token Missing!", 401),
    ERR_relogin: new exceptionConfig("Token Timeout!", 401),
    WARNING_authFail: new exceptionConfig("Login Fail！", 400),
    ERR_401: new exceptionConfig("Permission Denied!", 401),
    ERR_DB: new exceptionConfig("Database failure!", 500)
};
//# sourceMappingURL=serviceException.js.map