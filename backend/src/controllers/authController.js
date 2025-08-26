const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const { namehash } = require('ethers');
const jwt = require('jsonwebtoken')

//Generate Token Helper Function
const generateToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

//Register User Function
const registerUser = async (req,res) => {
    try{
        const {name,mobileNumber,password} = req.body;

        const userExists = await User.findOne({mobileNumber});
        if(userExists){
            return res.status(400).json({message: "User already exists with this mobile number."})
        }
        const salt = await bcrypt.genSalt(10);//Generating salt 
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            mobileNumber,
            password: hashedPassword,
        });
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                mobileNumber: user.mobileNumber,
                message: "User registered successfully",
            });
        }else {
        res.status(400).json({message:'Invalid user data.'})
        }
    }catch (error){

        if(error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message)[0];
            return res.status(400).json({ message });
        }
        res.status(400).json({message: 'Server error', error: error.message });
    }
};

//Login User Function
const loginUser = async (req,res) => {
    try {
        const {mobileNumber,password} = req.body;
        const user = await User.findOne({mobileNumber});

        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                mobileNumber: user.mobileNumber,
                token: generateToken(user._id, user.name),
            });
        }else {
            res.status(401).json({message: 'Invalid mobile number or password.'})
        }
    }catch(error){
        res.status(500).json({message: 'Server error',error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
};