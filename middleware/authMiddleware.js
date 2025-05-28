
const signup = async(req,res,next)=>{
        const {name,email,password,preferences}=req.body;
        console.log("hellllo");
        const missing={};
        if(!name){
            missing[name]="name is required"
        }
        if(!email){
            missing[email]="email is required"
        }
        if(!password){
            missing[password]="password is required"
        }
        if(!preferences){
            missing[preferences]="preferences is required"
        }
            if (Object.keys(missing).length > 0) {
            return res.status(400).send({
                status: 400,
                error: 'Missing required fields',
                missing
            });
        }
        next();
       
}
module.exports={
    signup
}