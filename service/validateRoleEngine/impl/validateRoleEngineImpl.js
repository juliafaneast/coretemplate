"use strict";
var validateRoleEngineImpl = (function () {
    function validateRoleEngineImpl() {
    }
    validateRoleEngineImpl.prototype.getInstance = function () {
        return validateRoleEngineImpl._instance;
    };
    /*
    private static TableACL = [
        {"role" : "employee", "browse" : ["leaves", "attendance"], "insert" : ["leaves"], "delete" : [], "update" : []},
        {"role" : "HRAdmin", "browse" : ["leaves", "attendance"], "insert" : ["card_record", "violation"], "delete" : [], "update" : ["card_record"]}
    ];
    */
    validateRoleEngineImpl.prototype.getRouterACL = function () {
        return validateRoleEngineImpl.RouterACL;
    };
    validateRoleEngineImpl.prototype.addPermission = function (role, permission) {
        var found = false;
        for (var i = 0; i < validateRoleEngineImpl.RouterACL.length; i++) {
            if (validateRoleEngineImpl.RouterACL[i].role == role) {
                validateRoleEngineImpl.RouterACL[i].permission.push(permission);
                found = true;
                break;
            }
        }
        if (!found) {
            validateRoleEngineImpl.RouterACL.push({ "role": role, "permission": permission });
        }
    };
    validateRoleEngineImpl.prototype.removePermission = function (role, permission) {
        for (var i = 0; i < validateRoleEngineImpl.RouterACL.length; i++) {
            if (validateRoleEngineImpl.RouterACL[i].role == role) {
                var idx = validateRoleEngineImpl.RouterACL[i].permission.indexOf(permission);
                if (idx > -1) {
                    validateRoleEngineImpl.RouterACL[i].permission.splice(idx, 1);
                }
                break;
            }
        }
    };
    validateRoleEngineImpl.prototype.validateRouter = function (role, url) {
        for (var i = 0; i < validateRoleEngineImpl.RouterACL.length; i++) {
            if (validateRoleEngineImpl.RouterACL[i].role == role) {
                var _api = validateRoleEngineImpl.RouterACL[i].permission;
                for (var j = 0; j < _api.length; j++) {
                    if (_api[j] == url) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    validateRoleEngineImpl._instance = new validateRoleEngineImpl();
    validateRoleEngineImpl.RouterACL = [
        { "role": "Admin", "permission": ["/updateUser", "/deleteUser"] },
        { "role": "HRManager", "permission": ["/addUser"] },
        { "role": "employee", "permission": ["/login", "/register"] }
    ];
    return validateRoleEngineImpl;
}());
exports.validateRoleEngineImpl = validateRoleEngineImpl;
