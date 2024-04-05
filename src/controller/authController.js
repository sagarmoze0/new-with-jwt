const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const emailValidator = require('email-validator')
const JWT = require('jsonwebtoken') 


const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  const validEmail = emailValidator.validate(email)
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Email',
    })
  }

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password not match',
      })
    }
    const userInfo = new userModel(req.body)
    const result = await userInfo.save()
    return res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      })
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}





const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and Password are required',
    });
  }

  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Email or Password',
      });
    }
    
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    user.password = undefined
    res.status(200).json({
      success: true,
      token, 
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const email = req.body.email
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    })
  }

  try {
    const user = await userModel.findOne({ email})
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found',
      })
    }

    const forgotPasswordToken = user.getForgotPasswordToken()
    await user.save()
    res.status(200).json({
      success: true,
      data: forgotPasswordToken,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
    
  }
}



const resetPassword = async (req, res, next) => {
  const { token } = req.params
  const { password, confirmPassword } = req.body

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'password and confirmPassword is required',
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'password and confirm Password does not match ❌',
    })
  }
  res.send(req.params.token)

  const hashToken = crypto.createHash('sha256').update(token).digest('hex')

  try {
    const user = await userModel.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: {
        $gt: new Date(), 
      },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Token or token is expired',
      })
    }

    user.password = password
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'successfully reset the password',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}



const logout = async (req, res, next) => {
  try {
    const cookieOption = {
      expires: new Date(), 
      httpOnly: true 
    };

    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged Out"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}



const getUser = async (req, res) => {
    const token = (req.cookies && req.cookies.token) || null
  
    if (!token) {
      return res.status(400).json({ success: false, message: 'NOT authorized' })
    }
  
    try {
      const payload = JWT.verify(token, process.env.SECRET)
      req.user = { id: payload.id, email: payload.email }
      const user = await userModel.findById(payload.id)
      return res.status(200).json({
        success: true,
        data: user,
      })
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message })
    }
  }
  

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  logout,
  getUser,
}
