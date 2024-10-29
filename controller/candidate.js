const candidate = require('../models/candidate');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const checkAdminRole = async (userId) => {
    try {
        const users = await user.findById(userId);
        return users.role === 'admin';
    } catch (error) {
       return false; 
    }
}

async function handlerAddCandidate(req,res){
    try {

        if(!await checkAdminRole(req.userId))
            return res.status(404).json({message:"User has not admin role"});

        const data = req.body;
        const newCandidate = await candidate.create(data);

        if(!newCandidate){
            return res.status(401).json({message:"Please Pass the Candidate Information"});
        }else{
            return res.json({message:"Candidate is created",newCandidate});
        }
        
    } catch (error) {
        console.error(error);
      return res.status(500).json({message:"Server Error"});
    }
}
async function handlerUpdateCandidate(req, res){

    try {
        if( ! await checkAdminRole(req.userId))
            return res.status(404).json({message:"User has not admin role"});
        const data = req.body;
        const candidateId = req.parms.candidateId;
        const updateData = await candidate.findByIdAndUpdate(candidateId,data,{new :true});
        if(!updateData){
            return res.status(404).json({message:"Candidate Not Found"});
        }else{
            return res.json({message:"Candidate Data Updated",updateData});
        }  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }
}
async function handlerDeleteCandidate(req, res){

    try {
        if(! await checkAdminRole(req.userId))
            return res.status(404).json({message:"User has not admin role"});
        const candidateId = req.parms.candidateId;
        const updateData = await candidate.findByIdAndDelete(candidateId);
        if(!updateData){
            return res.status(404).json({message:"Candidate Not Found"});
        }else{
            return res.json({message:"Candidate Deleted",updateData});
        }  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }
}
module.exports = {
    handlerAddCandidate,
    handlerUpdateCandidate,
    handlerDeleteCandidate
}