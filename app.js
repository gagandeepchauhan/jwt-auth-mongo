// Requiring necessary files
const express   = require('express')
const app       = express()
const mongoose  = require('mongoose')

// Configuring .env
process.env.NODE_ENV === 'development' && require('dotenv').config()
const PORT      = process.env.PORT

// Database configuration
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(()=>console.log('DB CONNECTED'))
.catch(err=>console.log('ERROR : ',err))

// Requiring models
require('./models/User')

// Requiring middleware
const authenticate  = require('./middlewares/authenticate')

// Using app feature
app.use(express.json())

// Requiring route files
const authRoute = require('./routes/authRoute')

// Routes
app.get("/",authenticate,(req,res)=>{
    const { user } = req
    res.status(200).json({
        success: true,
        email: user.email
    })
})
// Using routes
app.use(authRoute)

// App listener
app.listen(PORT,()=>console.log(`AUTH SERVER STARTED ON PORT ${PORT}`))