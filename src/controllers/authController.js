const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res)=>{
   // console.log('register');
    try{
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:'All fields are required'});
        }
        if(await User.findOne({email})){
            return res.status(400).json({message:'Email already exists'});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new User({
            username,
            email,
            password:hashedpassword
        });
        await newUser.save();
        res.status(201).json({message:'User registered successfully'});


    }
    catch(err)
    {
        console.error('Error during registration',err);
        res.status(500).json({message:'Internal server error'});
    }
    
};

const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:'All fields are required'});   
        }
        if(password.length<8){
            return res.status(400).json({message:'Password must be at least 8 characters long'});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }
        //comapring with password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        return res.status(200).json({token});

    }
    catch(err)
    {
        console.error('Error during login',err);
        return res.status(500).json({message:'Internal server error'});     
    }
}

module.exports={registerUser,loginUser};
