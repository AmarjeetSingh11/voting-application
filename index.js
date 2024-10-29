const express = require('express')
const bodyParser = require('body-parser')
const {ConnectMongoDB} = require('./connect');
const userRoute = require('./routes/userRoute');
const candidate = require('./models/candidate');
const profileRoute = require('./routes/profileRoute');
const candidateRoute = require('./routes/candidateRoute');
const voteRoute = require('./routes/votingRoute');
const authMiddlewares = require('./middlewares/userAuthmiddleware');
const app = express();
const PORT = 3000;

ConnectMongoDB('mongodb://127.0.0.1:27017/voting-db').then(
    () => console.log("MongoDB is Connected")
).catch(err => console.log(err))

app.use(express.urlencoded({extended:false}));
//Middleware
app.use(bodyParser.json());
async function handlerVoteCount(req, res){
    try {
       const cand = await candidate.find().sort({voteCount:'desc'});
       
       const record = cand.map((data)=>{
        return {
            party: data.party,
            count:data.voteCount
        }
       });

       return res.status(200).json(record)
    } catch (error) {
        console.error(error);
       return res.status(500).json({message:"Server Error"}); 
    }
}

// Define a route for getting the vote count
app.get('/api/vote-count', handlerVoteCount);
app.use('/api/user',userRoute);
app.use('/api/profile',authMiddlewares,profileRoute);
app.use('/api/candidate',authMiddlewares,candidateRoute);
app.use('/api/voting',authMiddlewares,voteRoute);


app.listen(PORT,() => console.log(`Server Started At Port :- ${PORT}`));
