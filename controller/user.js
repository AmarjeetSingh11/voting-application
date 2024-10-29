const user = require('../models/user');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function handlerSignUp(req, res){

    const {name,pass,aadharNo,address,age,email,mobile,role,isVoted} = req.body;
    const data = req.body;

    if(!name || !pass || !aadharNo || !age){
        return res.status(401).json({message:"Please Pass Name,Password,aadharNo and Age as required Field"});
    }
    try {
        
       const isUser = await user.findOne({where: {aadharNo:aadharNo}});
       if(isUser){
        return res.status(409).json({message:"You are Already a User Please Login"});
       }

       // Check if the role is admin
       if (role === 'admin') {
        const adminUser = await user.findOne({ where: { role: 'admin' } });
        if (adminUser) {
            return res.status(403).json({ message: "An admin user already exists." });
        }
    }

        
       const newUser = new user(data);

       const response = await newUser.save();
       console.log("Data Saved");

       const token = jwt.sign({ id:response.id }, config.jwtSecret,{ expiresIn: '7d'});

       return res.json({ accessToken: token });


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }

}
async function handlerLoginUser(req,res){
    try {
        
        const {aadharNo, pass} = req.body;

        const isUser = await user.findOne({aadharNo:aadharNo});

        if(!isUser){
            return res.status(401).json({message:"Please Register First"});
        }else{
           
            const token = jwt.sign({ id:isUser.id }, config.jwtSecret,{ expiresIn: '7d'});

            return res.json({ accessToken: token });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"}); 
    }
}
module.exports = {
    handlerSignUp,
    handlerLoginUser
}