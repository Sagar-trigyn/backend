const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    messages: {
        type: [Object], // or [MessageSchema] if you have a separate Message schema
        default: []
    }

})


// compare password methods
userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT, {
        expiresIn: '7d'
    })
}

userSchema.methods.reset = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetpassword = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetpasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken;
}
module.exports = mongoose.model('User', userSchema)
