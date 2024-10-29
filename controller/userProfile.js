const user = require('../models/user');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function handlerGetProfile(req,res){

    try {
        const isUser = await user.findById(req.userId).select('-__v -pass');

        if(!isUser){
            return res.status(401).json({message:"No User Found"});
        }else{
            return res.json({message:"Get Profile successfull",isUser});
        }  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }
}
async function handlerUpdateProfile(req, res){

    try {
        const pass = req.body.pass;
        if(!pass){
            return res.status(401).json({message:"Pleas Enter the New password"});
        }
        const userId = req.userId;
        console.log("User ID from Update Comtroller function:- ",userId);
    
        const updatePass = await user.findByIdAndUpdate(userId,{
            pass:pass
        },{new :true});
    
        if(!updatePass){
            return res.status(401).json({message:"Could not Update the Pass"});
        }else{
            return res.json({message:"Password Changes Successfully"});
        }  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }
}

module.exports = {
    handlerGetProfile,
    handlerUpdateProfile
}