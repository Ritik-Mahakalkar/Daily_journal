const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema ({
    title:String,
    content:String,
    created_at: {
    type: Date,
    default: Date.now,  // <-- Automatically sets current datetime
  },
})
const UserModule = mongoose.model ("users", UserSchema)

module.exports = UserModule