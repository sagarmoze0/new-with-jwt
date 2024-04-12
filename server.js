require('dotenv').config();
const express = require('express');
const dbConnect = require('./dbConnect'); 
const cookieParser=require('cookie-parser')
const app = express(); 
app.use(cookieParser())
app.use(express.json())
const newsRoute = require('./src/routes/newsRoute');
const userRoute = require('./src/routes/userRoute');
const fdRoute = require('./src/routes/fdRoute');

dbConnect(); 

app.use('/api/newsitems/', newsRoute);
app.use('/api/users/', userRoute);
app.use('/api/fditems/', fdRoute);
app.get('/', (req,res)=>res.send('hello sagar'))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
