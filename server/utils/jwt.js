const base64 = require("./base64");
const sha256 = require("./sha256");

// JWT generate
exports.sign = function (header, payload, secret) {
  const headerBase64 = base64.urlEncode(JSON.stringify(header));
  const payloadBase64 = base64.urlEncode(JSON.stringify(payload));
  const headerAndpayload = headerBase64 + "." + payloadBase64;
  const secretBase64 = sha256.sha256Encode(headerAndpayload + secret);
  return headerBase64 + "." + payloadBase64 + "." + secretBase64;
};

// JWT validation
exports.verify = function (token, secret) {
  const resultInfo = {};
  try{
    if (token) {
      const jwtDecode = token.split(".");
      const payload = JSON.parse(base64.urlDecode(jwtDecode[1]));
      if (
        sha256.sha256Encode(jwtDecode[0] + "." + jwtDecode[1] + secret) ===
        jwtDecode[2]
      ) {
        if (payload.expire < Date.now()) {
          resultInfo.expire = "token expired";
          resultInfo.code = 0; // Represents the jwt string expired
        } else {
          resultInfo.code = 2; // Represents Normal and has not expired
          resultInfo.data = payload;
        }
      } else {
        resultInfo.code = 1; // Represents an illegal jwt string
        resultInfo.expire = "Invalid token";
      }
    } else {
      resultInfo.code = -1; // Represents that the jwt string was not passed
      resultInfo.expire = "Missing token";
    }
  }catch(err){
     resultInfo.code = 1; // Represents that the jwt string was not passed
     resultInfo.expire = "Invalid token";
  }
  return resultInfo;
};
