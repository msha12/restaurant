const User = require("../models/userModel")
const Reservation = require("../models/reservationModel")
const Chef = require("../models/chefModel")
const Menu = require("../models/menuModel")
const Package = require("../models/packageModel")

const dashboardHome = async (req, res) => {
  const userCount = await User.countDocuments()
  const reservationCount = await Reservation.countDocuments()
  const chefCount = await Chef.countDocuments()
  const menuCount = await Menu.countDocuments()
  const packageCount = await Package.countDocuments()

  res.render("index", {
    component: "home",
    currentPage : 'home',
    searchPlace : 'chef',
    userCount,
    reservationCount,
    chefCount,
    menuCount,
    packageCount
  })
}

module.exports = {
    dashboardHome
}
