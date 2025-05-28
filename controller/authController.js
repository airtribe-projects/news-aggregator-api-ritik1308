const User= require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const signup = async(req,res,next)=>{
    try{
        const {name,email,password,preferences}=req.body;
        const data2 = req.body;

        const data=await User.findOne({email:req.body.email});
        // if(data){
        //     return res.status(400).send({
        //         status:400,
        //         message:"Already exists Please signIn"
        //     })
        // }

        data2.password= bcrypt.hashSync(data2.password,10);
        console.log("data password",data2.password);
        const response = await User.create(data2);
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

const login = async(req,res,next)=>{
    try{
       const  {email,password} = req.body;
       if(!email || !password){
        return res.status(401).send({
            status:400,
            message:"please fill all fields"
        })

       }
       const data =await User.findOne({email:req.body.email});
       if(!data){
        return res.status(400).send({
            status:400,
            message:"Please signup"
        })
       }
       const chk = bcrypt.compareSync(req.body.password,data.password);
       console.log(chk);
       if(!chk){
        return res.status(401).send({
            status:401,
            message:"email or password may be wrong"
        })
       }
       const token= jwt.sign({data},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})

       return res.status(200).send({
        status:200,
        token
       })


    }
    catch(err){
        console.log("error",err.message);
        return res.status(500).send({
            status:500,
            message:"Internal server error"
        })

    }
}


const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 

        next();
    } catch (err) {
        return res.status(401).send({
            success: 401,
            message: 'Invalid token.'
        });
    }
};

module.exports={
    signup,
    login,
    protect
}