const express = require("express");
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
    password: String,
    Items:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    productitem:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})
const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    offer:Number,
    image:String
})

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
mongoose.connect('mongodb+srv://2022007381ankit:1bDaDuXY1LRgkmZi@cluster0.etoup5d.mongodb.net/artifex').then(() => {
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

app.get("/username", authenticateJwt , async(req, res)=>{
    const user = req.user.username;
    const admin = await Admin.findOne({username: user});
    if(admin){
        res.json({
            username: admin.username
        })
        console.log(admin);
    }else{
        res.status(403).json({message: 'Invalid Credentials'})
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

app.post("/admin/addproduct", authenticateJwt, async (req, res)=>{
    try {
        const {title, description, price , offer, image} = req.body;
        const newProduct = new Product({title, description, price , offer, image });
        await newProduct.save();
        
        const admin = await Admin.findOne({ username: req.user.username });
        if (admin) {
          admin.Items.push(newProduct);
          await admin.save();
          res.status(200).json(newProduct);
        } else {
          res.status(403).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding Product' });
      }
})

app.get("/admin/product", authenticateJwt, async (req, res) =>{
    try{
        const user = req.user.username;
        const admin = await Admin.findOne({ username: user }).populate('Items');
        const Items = admin.Items;
        res.json({ Items });
    }catch(error){
        console.log(error);
        res.status(500).json({ message:"Error in getting product"})
    }
})

app.get("/getproduct", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete("/admin/delete/:productId", authenticateJwt, async (req, res) => {
    try {
      const productIdId = req.params.productId;
      await Product.deleteOne({ _id: productIdId });
      console.log('product deleted successfully');
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting note');
    }
  });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });