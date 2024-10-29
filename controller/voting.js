const candidate = require('../models/candidate');
const user = require('../models/user');

async function handlerVote(req,res){
    const candidateId = req.params.candidateId;
    const userId = req.userId;

    try {
        const cand = await candidate.findById(candidateId);
        if(!cand){
            return res.status(404).json({message:"Candidate Not Found"});
        }

        const isUser = await user.findById(userId);
        if(!isUser){
            return res.status(404).json({message:"Candidate Not Found"});
        }
        if(isUser.isVoted){
            return res.status(400).json({message:"You Cross the Vote Limit"});
        }

        if(isUser.role === 'admin'){
            return res.status(403).json({message:"You are Admin you can not vote"});
        }

        cand.votes.push({user:userId});
        cand.voteCount++;
        await cand.save();

        //Update the User that this is voted to true
        isUser.isVoted = true;
        await isUser.save();


        return res.status(200).json({message:"Vote Count Successfully"});

    } catch (error) {
        console.error(error);
       return res.status(500).json({message:"Server Error"}); 
    }
}


module.exports = {
    handlerVote,

}