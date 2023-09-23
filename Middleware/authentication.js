const jwt=require('jsonwebtoken');



async function authentication(req,res,next){
    const {accessToken}=req.cookies;
    
     if(accessToken){
        decoded=jwt.verify(accessToken,'masai');
        if(decoded.userID){
            req.body.userID=decoded.userID;

            next()
        }else{
            res.status(400).send({msg:"Please login!"})
        }
    }else{
        res.status(400).send({msg:"Please login!"})
    }
} 

module.exports={authentication}