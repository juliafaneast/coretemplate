"use strict";
/**
 * Created by dannyzhu on 1/16/17.
 */
var cacheServiceImpl = (function () {
    function cacheServiceImpl() {
        this.cache = new Map();
    }
    cacheServiceImpl.prototype.getInstance = function () {
        return cacheServiceImpl._instance;
    };
    cacheServiceImpl.prototype.put = function (key, value) {
        this.cache.set(key, value);
    };
    cacheServiceImpl.prototype.get = function (key) {
        return this.cache.get(key);
    };
    cacheServiceImpl.prototype.del = function (key) {
        this.cache.delete(key);
    };
    cacheServiceImpl._instance = new cacheServiceImpl();
    return cacheServiceImpl;
}());
exports.cacheServiceImpl = cacheServiceImpl;
//# sourceMappingURL=cacheServiceImpl.js.map