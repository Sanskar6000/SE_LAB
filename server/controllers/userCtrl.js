const Users = require('../models/userModel')
const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const userCtrl = {
    registerUser: async (req, res) => {
        try {
            const {username, email, password} = req.body;
            const user = await Users.findOne({email: email});
            if(user) return res.status(400).json({msg: "The email already exists"})
            
            const newUser = new Users({
                username: username, 
                email: email, 
                password: password
            });
            await newUser.save()
            res.json({msg: "Sign up Success"})
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email: email});
            if(!user) return res.status(400).json({msg: "The user already exists"})

            if(password != user.password) return res.status(400).json({msg: "Incorrect password."})
            const TOKEN_SECRET = "secret";
            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, TOKEN_SECRET, {expiresIn: "1d"})
            // res.json({msg: "Login a User"})    

            res.json({token});
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    },
    adminUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const admin = await Admin.findOne({email: email});
            if(!admin) return res.status(400).json({msg: "The user already exists"})

            if(password != admin.password) return res.status(400).json({msg: "Incorrect password."})
            const TOKEN_SECRET = "secret";
            const payload = {id: admin._id, name: admin.username}
            const token = jwt.sign(payload, TOKEN_SECRET, {expiresIn: "1d"})
            // res.json({msg: "Login a User"})    

            res.json({token});
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    },
    verifiedToken: (req, res) => {
        try {
          // token is contained in Header
          const token = req.header('Authorization');
          if (!token) return res.send(false);
    
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
            if (err) return res.send(false);
    
            const user = await Users.findById(verified.id);
            if (!user) return res.send(false);
    
            return res.send(true);
          });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
      verifiedTokenAdmin: (req, res) => {
        try {
          // token is contained in Header
          const token = req.header('Authorization');
          if (!token) return res.send(false);
    
          jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
            if (err) return res.send(false);
    
            const admin = await Admins.findById(verified.id);
            if (!admin) return res.send(false);
    
            return res.send(true);
          });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
      },
    };

module.exports = userCtrl