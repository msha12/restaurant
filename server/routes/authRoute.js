const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const redirectIfAuth = require('../middlewares/redirectIfAuth.js')


router.get('/login', redirectIfAuth,(req,res) => {
    res.render('pages/login', { title: 'Login Form' });
})

router.post('/login',authController.login)

router.get('/logout',authController.logout)


module.exports = router;