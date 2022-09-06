const jwt = require("../utils/jwt");
const config = require("../config/config")

// JWT generated
exports.generateToken = function(req,res){
     if(JSON.stringify(req.body) === "{}"){
        res.send({errMsg:"Missing request body, payload"});
     }
     req.body.expire = Date.now() + config.expire;
     res.send(jwt.sign(config.header,req.body,config.secret))
} 

 