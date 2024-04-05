const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
};

module.exports = dbConnect
