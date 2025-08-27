const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUserPage,
  addUser,
  editUserPage,
  editUser,
  deleteUser
} = require("../controllers/userController");

// عرض كل اليوزرز
router.get("/", getAllUsers);

// صفحة إضافة يوزر
router.get("/add", addUserPage);

// إضافة يوزر
router.post("/add", addUser);

// صفحة تعديل يوزر
router.get("/edit/:id", editUserPage);

// تعديل يوزر
router.put("/:id", editUser);

// حذف يوزر
router.delete("/:id", deleteUser);

module.exports = router;
