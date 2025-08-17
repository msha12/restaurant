
const Admin = require("../models/adminModel");
const generateToken = require('../utils/generateToken')

const login = async (req, res) => {
    const { username,email, password,role} = req.body;
    try {
        const admin = await Admin.findOne({ email,password});
        console.log(admin)
        if(!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        admin.token = generateToken({email,role,username})
        res.redirect('/')
    }catch {
        return res.status(500).json({ message: "Error" });
    }


}


module.exports = {
    login
}