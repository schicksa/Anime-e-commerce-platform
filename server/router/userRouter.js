const express = require("express");
const router = express.Router();
const {validateToken} = require("../middleware/auth")
const {generateToken} =  require("../controller/userControll")

// Returns the route of the token
router.post("/generateToken",generateToken); 

// Testing Token Verification
router.post("/auth",validateToken,(req,res)=>{
     res.send({code:2,expire:"token is normal",userInfo:res.userInfo})
});

module.exports = router;

