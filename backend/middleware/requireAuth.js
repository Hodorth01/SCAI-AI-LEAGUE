
const jwt = require("jsonwebtoken")
const USER = require("../models/userModel")
const requireAuth = async (req, res ,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"No token provided"})
    }
    const token = authorization.split(" ")[1]
    try{
        const {_id} = jwt.verify(token , process.env.SECRET)
        req.user = await USER.findOne({_id}).select("_id")
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({error:"request is not authenticated"})
    }
}
module.exports=requireAuth;