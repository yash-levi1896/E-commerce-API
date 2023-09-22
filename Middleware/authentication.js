const { BlacklistModel } = require("../Models/blacklisting.model");
const jwt=require('jsonwebtoken');
const { UserModel } = require("../Models/user.model");


async function authentication(req,res,next){
    const {accessToken}=req.cookies;
    let blacklisttoken=await BlacklistModel.find({token:accessToken})
    if(blacklisttoken.length>0){
        res.status(200).send({msg:"Please login again!"})
    }
    
    else if(accessToken){
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