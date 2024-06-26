const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;




// const PORT = 4000;
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

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
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
    const userid = await User.findOne({username: user});
    if(admin){
        res.json({
            username: admin.username
        })
        console.log(admin);
    }else if(userid){
        res.json({
            username: userid.username
            })
            console.log(userid);
    }
    else{
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

app.get("/getproduct/:itemId", async (req, res) => {
    try {
        const { itemId } = req.params; // Corrected this line
        // console.log(itemId);
        const products = await Product.find({ _id: itemId });
        // console.log(products);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.post("/addcart/:itemId",authenticateJwt, async(req, res) => {
    try{
        const { itemId } = req.params;
        const user = await User.findOne({username: req.user.username});
        if(user){
            user.productitem.push(itemId);
            await user.save();
            res.json({ message: 'Product added to cart' });
            console.log("product added to cart sucessfuly");
        } else {
            res.status(403).json({message:"User not found"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:"server error"});
    }
})

app.get("/getcart", authenticateJwt, async(req, res) => {
    try{
        const user = await User.findOne({username: req.user.username}).populate('productitem');
        if(user){
            res.json(user.productitem);
            // console.log(user.productitem)
            } else {
                res.status(403).json({message:"User not found"})
            }
    } catch(error){
        res.status(500).json({error:"server error"});
    }    
})


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