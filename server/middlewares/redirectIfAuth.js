const jwt = require('jsonwebtoken');

const redirectIfAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      console.log('you are login already')
    //   res.json({err,""})
      return res.redirect('/home'); // هنا لازم تحط return علشان يوقف
    } catch (err) {
      return next();
    }
  }

  return next();
};

module.exports = redirectIfAuth;
