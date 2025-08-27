
const User = require("../models/userModel");
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({ email});
        if(!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if(!checkPassword) {
            return res.status(401).json({ message: "Invalid password" });
        } 
        user.token = await generateToken({
            email,
            role: user.role,
            username: user.username,
            id: user._id,
            
        });
        // await user.save();
        res.cookie("token", user.token, { 
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
   });
        res.redirect('/home')
    }catch {
        return res.status(500).json({ message: "Error : can\'t login" });
    }
}


const logout =  async (req, res) => {
  res.clearCookie('token') 
  res.redirect('/login')
}



module.exports = {
    login,
    logout
}