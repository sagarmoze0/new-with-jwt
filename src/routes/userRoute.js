const express = require('express')
const jwtAuth = require('../middel/jwtAuth')
const {signUp,  signIn, forgotPassword, resetPassword, logout, getUser} = require('../controller/authController')
const router = express.Router()




router.post('/register',signUp)
router.post('/login',signIn)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword/:token', resetPassword)
router.get('/logout',jwtAuth, logout)
router.get('/user',jwtAuth,getUser)


module.exports=router



