const config = require("../config/config")
const crypto = require("crypto");

exports.sha256Encode = function(encodeBase64Str){
    const hash = crypto.createHash(config.crypto);
    hash.update(encodeBase64Str+config.secret,"utf8");
    return hash.digest("hex");
}

