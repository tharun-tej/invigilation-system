require("dotenv").config();
const express=require("express");
const app=express();
const cors = require('cors');
app.use(cors({ origin: true }));
app.use(express.json());
const bcrypt = require("bcrypt");
const mongoose=require("mongoose");

const auth = require("./routes/auth")
const admin = require("./routes/admin")
var ExamDetails = {}

app.use("/auth", auth);
app.use("/admin",admin);


const connectDb = async ()=>{
    try{
    const conn= await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('connection successful '+conn.connection.host);
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}
app.get("/api/",async (req,res)=>{
    const hashedPassword = await bcrypt.hash("exambranchadmin", 10);
    res.send("<h1>hello</h1>"+hashedPassword);
})

app.post('/postExamDetails', async (req,res)=>{
    ExamDetails = req.body;
    res.status(200).json({message : 'Details collected successfully'});
})
app.get('/getExamDetails', async (req,res)=>{
    res.status(200).json(ExamDetails);
})

connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server started listening');
    })
}).catch((err)=>{
    console.log(err);
})