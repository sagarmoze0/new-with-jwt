const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const randomBytes = crypto.randomBytes(32);


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'user name is Required'],
      minLength: [5, 'Name must be at least 5 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'user email is required'],
      unique: true,
      lowercase: true,
      unique: [true, 'already registered'],
    },
    
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  { timestamps: true}
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})


userSchema.methods = {
  jwtToken() {
    return JWT.sign(
     { id: this._id, email: this.email},
      process.env.SECRET,
       { expiresIn: '24h' }
       )
  },
  getForgotPasswordToken(){
   const forgotToken = crypto.randomBytes(20).toString('hex')
   this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex')
   this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000
   return forgotToken
  }
}
const UserModel = mongoose.model('Users', userSchema)


module.exports = UserModel
