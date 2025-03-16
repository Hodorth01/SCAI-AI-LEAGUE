const mongoose =  require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const validator = require("validator")

const userSchema = new Schema({
    userName:{
        type:String,
        required: true,
        unique : true
    },
    password:{
        type:String,
        required: true,
    }
})

userSchema.statics.signup = async function(userName,password){
    const exists = await this.findOne({userName:userName})
    if(exists){
        throw new Error("User already exists")
    }
    if(!userName || !password){
        throw new Error("all fields are required")
    }
    if (!validator.isAlphanumeric(userName)) {
        throw new Error("Username can only contain letters and numbers");
    }
    if (userName.length < 3 || userName.length > 20) {
        throw new Error("Username must be between 3 and 20 characters");
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({userName , password:hash})
    return user
}
userSchema.statics.login = async function(userName,password){
    const user= await this.findOne({userName:userName})
    
    if(!userName || !password){
        throw new Error("all fields are required")
    }
    if(!user){
        throw new Error("username is incorrect")
    }
    const comparedPasswords = await bcrypt.compare(password , user.password)
    if(!comparedPasswords){
        throw new Error("Password is incorrect")
    }
    return user
}

module.exports = mongoose.model("User",userSchema)