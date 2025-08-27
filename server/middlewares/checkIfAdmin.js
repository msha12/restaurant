
const checkIfAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  try {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).send('Access denied. Admins only.');
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send('Invalid token.');
  }
};

module.exports = checkIfAdmin;
