const jwt=require('jsonwebtoken');



 function authentication(req,res,next){
    const {accessToken}=req.cookies;  // extracting accessToken from cookies
    
     if(accessToken){                // check if the accessToken present or not
        decoded=jwt.verify(accessToken,process.env.Secret_key);   // verify the token is correct or not
        if(decoded.userID){
            req.body.userID=decoded.userID;             // attach userID in the body to manage the user session
            next()                                      // got to the next middleware or route
        }else{
            res.status(401).send({msg:"Please login!"})  // response if jwt token is not verified
        }
    }else{
        res.status(401).send({msg:"Please login!"})     // accessToken not found
    }
} 

module.exports={authentication}