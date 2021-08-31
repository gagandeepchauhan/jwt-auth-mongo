const express   = require('express')
const router    = express.Router()
const { model } = require('mongoose')
const User      = model('User')
const jwt       = require('jsonwebtoken')

router.post("/signup", async (req,res)=>{
    const { email, password } = req.body

    if( !email || !password ){
        return res.status(400).json({
            error: "You must provide email and password"
        })
    }
    try{
        const user= await User.create({ email, password })
        const token= generateToken({ userId: user._id })
        res.status(200).json({
            token
        })
    }catch(err){
        return res.status(422).json({
            error: "User already exist"
        })
    }  
})

router.post("/signin", async (req,res)=>{
    const { email, password } = req.body

    if( !email || !password ){
        return res.status(400).json({
            error: "You must provide email and password"
        })
    }
    try{
        const user= await User.findOne({ email })
        if(!user){
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        const result = await user.comparePassword(password)
        if(!result){
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        const token= generateToken({ userId: user._id })
        res.status(200).json({
            token
        })
    }catch(err){
        return res.status(422).json({
            error: "You can't signup"
        })
    } 
})

function generateToken(data){
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '30m' })
}

module.exports  = router