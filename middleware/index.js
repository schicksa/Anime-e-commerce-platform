const sha1 = require("sha1")

module.exports = (req, res, next) => {
    if(req.body.pwd){
        req.body.pwd = sha1(req.body.pwd)
    }
    if( req.query.pwd){
        req.query.pwd = sha1(req.query.pwd)
    }
    next()
} 