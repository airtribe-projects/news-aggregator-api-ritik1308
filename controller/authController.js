const User= require('../model/userModel');
const jwt = require('jsonwebtoken');


const signup = async(req,res,next)=>{
    try{
        const {name,email,password,preferences}=req.body;

        const data=await User.findOne({email:req.body.email});
        if(data){
            return res.status(400).send({
                status:400,
                message:"Already exists Please signIn"
            })
        }


        const response = await User.create(req.body);
        const token= jwt.sign({response},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})

        return  res.status(200).send({
            status:200,
            token:token

        })

        

    }
    catch(err){
        console.log(err.message);
        console.error('Error creating user:', err.message);
        res.status(500).json({ error: 'Internal server error' });

    }
}
module.exports={
    signup
}