const express = require("express")
const router = express.Router()
const { loginUser, signupUser } = require('../controllers/userController')

router.get("/",(req,res)=>{
    res.json({mssg:"get users"})
})
router.post("/login",loginUser)
router.post("/signup",signupUser)

module.exports = router;