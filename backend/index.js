const express = require("express");
const react = require("react")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 4000;
const app = express();
app.use(cors());
// parse requests of content-type - application
app.use(express.json());

const SECRET = "R56etdc";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
mongoose.connect('mongodb+srv://2022007381ankit:CBcmaL3pShirFMPa@cluster0.etoup5d.mongodb.net/artifex').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  

app.post("/admin/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminexit = await Admin.findOne({ username: username });
        if (adminexit) {
            return res.status(403).json({ message: "Admin already exits:" });
        }
        const newadmin = new Admin({username, password});
        await newadmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating admin' });
      }
});

app.post("/admin/signin", async(req,  res)=>{
    try{
        const{username, password} = req.body;
        const admin = await Admin.findOne({username, password});
        if(admin){
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        }else{
            return res.send(403).json({message:'Invalid Credentials'})
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
      }
})
app.post("/user/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminexit = await User.findOne({ username: username });
        if (adminexit) {
            return res.status(403).json({ message: "Admin already exits:" });
        }
        const newadmin = new User({username, password});
        await newadmin.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating admin' });
      }
});

app.post("/user/signin", async(req,  res)=>{
    try{
        const{username, password} = req.body;
        const admin = await User.findOne({username, password});
        if(admin){
            const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        }else{
            return res.send(403).json({message:'Invalid Credentials'})
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
      }
})

app.post("/additem", authenticateJwt, async (req, res)=>{
    res.send("item added");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });