"use strict";
var encryption;
(function (encryption) {
    var crypto = require('crypto');
    var algorithm_aes128 = 'aes128';
    var algorithm_rc4 = 'rc4';
    function encryptMd5(s) {
        s = s.toLowerCase().trim();
        var md5 = crypto.createHash('md5');
        md5.update(s);
        return md5.digest('hex');
    }
    encryption.encryptMd5 = encryptMd5;
    function encryptRC4(content) {
        var config = global.config;
        return cipher(algorithm_rc4, config.rc4_key, content, config.rc4_iv);
    }
    encryption.encryptRC4 = encryptRC4;
    function decryptRC4(content) {
        var config = global.config;
        return decipher(algorithm_rc4, config.rc4_key, content, config.rc4_iv);
    }
    encryption.decryptRC4 = decryptRC4;
    function encryptAES128(key, content) {
        var config = global.config;
        return cipher(algorithm_aes128, key, content, config.aes128_iv);
    }
    encryption.encryptAES128 = encryptAES128;
    function decryptAES128(key, content) {
        var config = global.config;
        return decipher(algorithm_aes128, key, content, config.aes128_iv);
    }
    encryption.decryptAES128 = decryptAES128;
    function cipher(algorithm, key, content, algorithm_iv) {
        key = getBuffer(key);
        content = getBuffer(content);
        var cip = crypto.createCipheriv(algorithm, key, algorithm_iv);
        var encrypted = cip.update(content, 'hex', 'hex');
        encrypted += cip.final('hex');
        return encrypted.toString('hex');
    }
    function decipher(algorithm, key, content, algorithm_iv) {
        key = getBuffer(key);
        content = getBuffer(content);
        var decipher = crypto.createDecipheriv(algorithm, key, algorithm_iv);
        var decrypted = decipher.update(content, 'hex', 'hex');
        decrypted += decipher.final('hex');
        return decrypted.toString('hex');
    }
    function getBuffer(cont) {
        if (cont instanceof Buffer) {
            return cont;
        }
        else {
            return new Buffer(cont, 'hex');
        }
    }
})(encryption = exports.encryption || (exports.encryption = {}));
//# sourceMappingURL=encryption.js.map