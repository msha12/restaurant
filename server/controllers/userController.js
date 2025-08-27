const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken')


const getAllUsers = async (req, res) => {
  const users = await User.find();
  

  res.render("index", {
    component: "allUsers",
    users,
    currentPage: "users",
    
  });
};

const addUserPage = async (req, res) => {
  
  res.render("index", {
    component: "addUser",
    currentPage: "users",
    
  });
};


const addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    newUser.token = await generateToken({email,user: newUser.role,username: newUser.username})
        
    await newUser.save();
    res.redirect("/user");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Internal Server Error");
  }
};


// عرض صفحة تعديل يوزر
const editUserPage = async (req, res) => {
  
  const user = await User.findById(req.params.id);

  res.render("index", {
    component: "editUser",
    currentPage: "users",
    user,
    
  });
};

// تعديل يوزر
const editUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const updateData = { username, email, role };

    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(req.params.id, updateData);
    console.log(updateData)

    res.redirect("/user");
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).send("Internal Server Error");
  }
};
// حذف يوزر
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/user");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  addUserPage,
  addUser,
  editUserPage,
  editUser,
  deleteUser,
};
