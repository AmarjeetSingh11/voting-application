const mongoose = require('mongoose');
const candidateSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    party:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'user'
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
});
const candidate = mongoose.model('candidate',candidateSchema);
module.exports = candidate;
