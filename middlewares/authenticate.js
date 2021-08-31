const { model } = require('mongoose')
const User      = model('User')
const jwt       = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({
            error: "Must provide token"
        })
    }
    const token = authorization.split(' ')[1]
    if(!token){
        return res.status(401).json({
            error: "Must provide token"
        })
    }
    jwt.verify(token,process.env.SECRET_KEY, async (err,data)=>{
        if(err){
            return res.status(401).json({
                error: "Invalid token"
            })
        }
        const { userId }= data
        const user= await User.findById(userId)
        req.user= user
        next()
    })
}